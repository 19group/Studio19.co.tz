<?php
header('Content-Type: application/json');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/PHPMailer/src/Exception.php';
require __DIR__ . '/PHPMailer/src/PHPMailer.php';
require __DIR__ . '/PHPMailer/src/SMTP.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

// Read the raw POST data (from fetch API)
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// If standard form data was sent instead of JSON
if (!$data) {
    $data = $_POST;
}

$name = trim(stripslashes($data['name'] ?? ''));
$fromemail = trim(stripslashes($data['email'] ?? ''));
$objective = trim(stripslashes($data['objective'] ?? ''));
$timeframe = trim(stripslashes($data['timeframe'] ?? ''));
$budget = trim(stripslashes($data['budget'] ?? 'Not specified'));

// Basic Server-Side Validation
if (empty($name) || empty($fromemail) || empty($objective) || empty($timeframe)) {
    echo json_encode(['success' => false, 'message' => 'Please fill out all required fields.']);
    exit;
}

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->SMTPDebug = 0;                      // Disable verbose debug output for production
    $mail->isSMTP();                           // Send using SMTP
    $mail->Host       = "mail.studio19.co.tz";      // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                  // Enable SMTP authentication
    $mail->Username   = 'noreply@studio19.co.tz'; // SMTP username
    $mail->Password   = 'Noreply@stud1019';    // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // Enable implicit TLS encryption
    $mail->Port       = 465;                   // TCP port to connect to

    // Recipients
    $mail->setFrom('noreply@studio19.co.tz', 'Studio 19 Team');
    $mail->addAddress('brian@studio19.co.tz'); // Add a recipient
    
    // Add Reply-To so hitting "Reply" goes to the client who submitted it
    $mail->addReplyTo($fromemail, $name);

    // Content
    $mail->isHTML(true); // Set email format to HTML
    $mail->Subject = 'New Lead Submission: ' . $name;
    
    // Email Body Construction
    $body = "<h2>New Lead Intake Form Submission</h2>";
    $body .= "<p><strong>Name:</strong> {$name}</p>";
    $body .= "<p><strong>Email/Contact:</strong> {$fromemail}</p>";
    $body .= "<p><strong>Timeframe:</strong> {$timeframe}</p>";
    $body .= "<p><strong>Estimated Budget:</strong> {$budget}</p>";
    $body .= "<h3>Project Objective:</h3>";
    $body .= "<p>" . nl2br(htmlspecialchars($objective)) . "</p>";

    $mail->Body    = $body;
    $mail->AltBody = strip_tags(str_replace("<br>", "\n", $body));

    $mail->send();
    echo json_encode(['success' => true, 'message' => 'Your project details have been successfully received. We will be in touch shortly.']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"]);
}
?>
