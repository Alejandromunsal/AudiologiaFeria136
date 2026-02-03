<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Si no tienes autoload de Composer, incluye PHPMailer manualmente
require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/phpmailer/src/SMTP.php';
require '../vendor/phpmailer/phpmailer/src/Exception.php';

// Recoger datos del formulario de manera segura
$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$telephone = $_POST['telephone'] ?? '';
$subject = $_POST['subject'] ?? 'Nuevo mensaje desde formulario';
$message = $_POST['message'] ?? '';

// Validación básica
if(empty($name) || empty($email) || empty($message)) {
    echo 'Por favor rellena todos los campos requeridos.';
    exit;
}

$mail = new PHPMailer(true);

try {
    // Configuración básica
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';
    
    // SMTP Gmail
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'audioferia@gmail.com'; // tu Gmail
    $mail->Password = 'jghlzkvzjdkugwjw';     // contraseña de aplicación
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    // Remitente oficial (Gmail) para evitar spam
    $mail->setFrom($mail->Username, 'AudioFeria136');

    // Destinatario principal (tú)
    $mail->addAddress('audioferia@gmail.com');

    // Reply-To: cliente
    $mail->addReplyTo($email, $name);

    // Copia al cliente
    $mail->addCC($email);

    // Asunto
    $mail->Subject = $subject;

    // Logo embebido
    $mail->addEmbeddedImage('../assets/img/audioferiaLogo.png', 'logo_cid');

    // Contenido HTML
    $body = '
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background: #f5f5f5; padding: 10px; text-align: center; }
        .content { padding: 20px; }
        .footer { margin-top: 30px; font-size: 12px; color: #666; text-align: center; }
        .label { font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <img src="cid:logo_cid" alt="Logo" style="width:50px; margin-bottom:20px;"><br>
        <h2>AudioFeria136</h2>
        <h3>Nuevo mensaje desde formulario</h3>
      </div>
      <div class="content">
        <p><span class="label">Nombre:</span> ' . htmlspecialchars($name) . '</p>
        <p><span class="label">Email:</span> ' . htmlspecialchars($email) . '</p>
        <p><span class="label">Teléfono:</span> ' . htmlspecialchars($telephone) . '</p>
        <p><span class="label">Mensaje:</span><br>' . nl2br(htmlspecialchars($message)) . '</p>
      </div>
      <div class="footer">
        Este correo fue enviado desde el formulario de contacto de tu web.<br>
        &copy; ' . date('Y') . ' AudioFeria136
      </div>
    </body>
    </html>
    ';

    $mail->isHTML(true);
    $mail->Body = $body;

    // Enviar
    $mail->send();
    echo 'OK';

} catch (Exception $e) {
    echo "Error al enviar el mensaje: {$mail->ErrorInfo}";
}
?>
