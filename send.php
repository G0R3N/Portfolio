<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $to = 'gorenjm04@gmail.com';
  $subject = 'Mensaje desde el formulario del portfolio';
  $message = "Nombre: {$_POST['name']}\nEmail: {$_POST['email']}\nMensaje:\n{$_POST['message']}";
  $headers = 'From: noreply@tu-dominio.com' . "\r\n" .
             'Reply-To: ' . $_POST['email'];
  mail($to, $subject, $message, $headers);
  header('Location: gracias.html');
}
?>