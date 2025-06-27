<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('Método no permitido');
}

// Recogemos y saneamos
$name    = filter_input(INPUT_POST, 'name',    FILTER_SANITIZE_STRING);
$email   = filter_input(INPUT_POST, 'email',   FILTER_VALIDATE_EMAIL);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

header('Content-Type: text/plain; charset=utf-8');
// Depuración: mostramos valores recibidos
echo "DEBUG:\n";
echo "Name: $name\n";
echo "Email: $email\n";
echo "Message: $message\n\n";

if (!$name || !$email || !$message) {
    die("Error: datos incompletos o inválidos.");
}

$to      = 'gorenjm04@gmail.com';
$subject = 'Mensaje desde el portfolio';
$body    = "Nombre: $name\nEmail: $email\nMensaje:\n$message";
$headers = [
    'From'    => 'no-reply@tudominio.com',
    'Reply-To'=> $email,
    'X-Mailer'=> 'PHP/' . phpversion(),
];

$mailSent = mail($to, $subject, $body, $headers);

echo "\nmail() returned: " . ($mailSent ? "TRUE" : "FALSE") . "\n";

if ($mailSent) {
    echo "\nMensaje enviado correctamente.";
} else {
    echo "\nError al enviar el mensaje.";
}
