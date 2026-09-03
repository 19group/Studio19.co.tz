<?php
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

$configPath = __DIR__ . '/config.php';
if (file_exists($configPath)) {
    require_once $configPath;
} else {
    echo json_encode(['success' => false, 'message' => 'Server configuration missing.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

// Honeypot: real applicants never fill this in. If it's filled, quietly pretend success.
$honeypot = trim($_POST['website'] ?? '');
if ($honeypot !== '') {
    echo json_encode(['success' => true, 'message' => 'Application received.']);
    exit;
}

$name        = trim(stripslashes($_POST['name'] ?? ''));
$phone       = trim(stripslashes($_POST['phone'] ?? ''));
$email       = trim(stripslashes($_POST['email'] ?? ''));
$videoLink   = trim(stripslashes($_POST['videoLink'] ?? ''));
$positionId  = trim(stripslashes($_POST['positionId'] ?? ''));
$positionTitle = trim(stripslashes($_POST['positionTitle'] ?? ''));

if (empty($name) || empty($phone) || empty($email) || empty($videoLink) || empty($positionId)) {
    echo json_encode(['success' => false, 'message' => 'Please fill out all required fields.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Please provide a valid email address.']);
    exit;
}

if (!filter_var($videoLink, FILTER_VALIDATE_URL)) {
    echo json_encode(['success' => false, 'message' => 'Please provide a valid video link.']);
    exit;
}

// --- CV upload validation ---
if (!isset($_FILES['cv']) || $_FILES['cv']['error'] === UPLOAD_ERR_NO_FILE) {
    echo json_encode(['success' => false, 'message' => 'Please attach your CV.']);
    exit;
}

if ($_FILES['cv']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(['success' => false, 'message' => 'There was a problem uploading your CV. Please make sure it is under 5MB and try again.']);
    exit;
}

$maxBytes = 5 * 1024 * 1024;
if ($_FILES['cv']['size'] > $maxBytes) {
    echo json_encode(['success' => false, 'message' => 'Your CV must be under 5MB.']);
    exit;
}

$originalName = $_FILES['cv']['name'];
$ext = strtolower(pathinfo($originalName, PATHINFO_EXTENSION));
$allowedExt = ['pdf', 'doc', 'docx'];
if (!in_array($ext, $allowedExt, true)) {
    echo json_encode(['success' => false, 'message' => 'CV must be a PDF or Word document (.pdf, .doc, .docx).']);
    exit;
}

$allowedMime = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/zip', // .docx is a zip container; some fileinfo setups report this
    'application/octet-stream',
];
$finfo = new finfo(FILEINFO_MIME_TYPE);
$detectedMime = $finfo->file($_FILES['cv']['tmp_name']);
if (!in_array($detectedMime, $allowedMime, true)) {
    echo json_encode(['success' => false, 'message' => 'That file does not look like a valid PDF or Word document.']);
    exit;
}

// --- Store the application privately on the server as a backup ---
$appsDir = __DIR__ . '/applications';
$uploadsDir = $appsDir . '/uploads';
if (!is_dir($uploadsDir)) {
    mkdir($uploadsDir, 0755, true);
}

$safeName = bin2hex(random_bytes(8)) . '.' . $ext;
$storedPath = $uploadsDir . '/' . $safeName;

if (!move_uploaded_file($_FILES['cv']['tmp_name'], $storedPath)) {
    echo json_encode(['success' => false, 'message' => 'Could not save your CV. Please try again.']);
    exit;
}

$logEntry = [
    'timestamp' => date('c'),
    'positionId' => $positionId,
    'positionTitle' => $positionTitle,
    'name' => $name,
    'phone' => $phone,
    'email' => $email,
    'videoLink' => $videoLink,
    'cvOriginalName' => $originalName,
    'cvStoredFile' => $safeName,
];
file_put_contents($appsDir . '/applications.jsonl', json_encode($logEntry) . "\n", FILE_APPEND | LOCK_EX);

// --- Email the application to the talent inbox ---
$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = 0;
    $mail->isSMTP();
    $mail->Host       = defined('SMTP_HOST') ? SMTP_HOST : 'mail.studio19.co.tz';
    $mail->SMTPAuth   = true;
    $mail->Username   = defined('SMTP_USERNAME') ? SMTP_USERNAME : 'noreply@studio19.co.tz';
    $mail->Password   = defined('SMTP_PASSWORD') ? SMTP_PASSWORD : '';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    $mail->setFrom($mail->Username, 'Studio 19 Talent');
    $toAddress = defined('TALENT_TO_ADDRESS') ? TALENT_TO_ADDRESS : 'talent@studio19.co.tz';
    $mail->addAddress($toAddress);
    $mail->addReplyTo($email, $name);
    $mail->addAttachment($storedPath, $originalName);

    $mail->isHTML(true);
    $mail->Subject = 'New Application: ' . $positionTitle . ' — ' . $name;

    $body = "<h2>New Application</h2>";
    $body .= "<p><strong>Position:</strong> " . htmlspecialchars($positionTitle) . "</p>";
    $body .= "<p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>";
    $body .= "<p><strong>Phone:</strong> " . htmlspecialchars($phone) . "</p>";
    $body .= "<p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>";
    $body .= "<p><strong>Video Link:</strong> <a href=\"" . htmlspecialchars($videoLink) . "\">" . htmlspecialchars($videoLink) . "</a></p>";
    $body .= "<p>CV attached.</p>";

    $mail->Body    = $body;
    $mail->AltBody = strip_tags(str_replace("<br>", "\n", $body));

    $mail->send();
} catch (Exception $e) {
    // Swallow: the application is already safely backed up on disk above.
}

// --- Best-effort confirmation email to the applicant (never blocks success) ---
try {
    $confirm = new PHPMailer(true);
    $confirm->SMTPDebug = 0;
    $confirm->isSMTP();
    $confirm->Host       = defined('SMTP_HOST') ? SMTP_HOST : 'mail.studio19.co.tz';
    $confirm->SMTPAuth   = true;
    $confirm->Username   = defined('SMTP_USERNAME') ? SMTP_USERNAME : 'noreply@studio19.co.tz';
    $confirm->Password   = defined('SMTP_PASSWORD') ? SMTP_PASSWORD : '';
    $confirm->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $confirm->Port       = 465;

    $confirm->setFrom($confirm->Username, 'Studio 19 Talent');
    $confirm->addAddress($email, $name);

    $confirm->isHTML(true);
    $confirm->Subject = 'We received your application — ' . $positionTitle;
    $confirm->Body = "<p>Hi " . htmlspecialchars($name) . ",</p>"
        . "<p>Thanks for applying for <strong>" . htmlspecialchars($positionTitle) . "</strong> at Studio 19. We've received your application and will be in touch if you're shortlisted.</p>"
        . "<p>— Studio 19 Talent Team</p>";
    $confirm->AltBody = "Hi $name,\n\nThanks for applying for $positionTitle at Studio 19. We've received your application and will be in touch if you're shortlisted.\n\n— Studio 19 Talent Team";

    $confirm->send();
} catch (Exception $e) {
    // Non-critical: the application itself was already saved/emailed above.
}

echo json_encode([
    'success' => true,
    'message' => "Thanks — we've received your application for {$positionTitle}. Only shortlisted candidates will be contacted.",
]);
