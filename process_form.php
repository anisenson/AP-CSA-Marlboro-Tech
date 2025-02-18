<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize input
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Email details
    $to = "adamjn524@gmail.com"; // Replace with your email address
    $subject = "New Contact Form Submission: $subject";
    $body = "You have received a new message from $name ($email):\n\n$message";

    // Send the email
    if (mail($to, $subject, $body)) {
        echo "Your message has been sent. Thank you!";
    } else {
        echo "Failed to send the message. Please try again.";
    }
}
?>
