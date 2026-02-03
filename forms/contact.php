<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// PHPMailer manual (si no usas Composer)
require '../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../vendor/phpmailer/phpmailer/src/SMTP.php';
require '../vendor/phpmailer/phpmailer/src/Exception.php';

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Método no permitido');
}

// Recoger y limpiar datos
$name      = trim($_POST['name'] ?? '');
$email     = trim($_POST['email'] ?? '');
$telephone = trim($_POST['telephone'] ?? '');
$subject   = trim($_POST['subject'] ?? 'Nuevo mensaje desde formulario');
$message   = trim($_POST['message'] ?? '');

// Validación básica
if ($name === '' || $email === '' || $message === '') {
    exit('Por favor rellena todos los campos requeridos.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    exit('Email no válido.');
}

// Crear PHPMailer
$mail = new PHPMailer(true);

try {
    $mail->CharSet = 'UTF-8';
    $mail->Encoding = 'base64';
    $mail->isSMTP();

    // Configuración SMTP usando variables de entorno
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = getenv('SMTP_USER'); // tu Gmail desde variable de entorno
    $mail->Password   = getenv('SMTP_PASS'); // contraseña de aplicación desde variable de entorno
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Remitente oficial
    $mail->setFrom($mail->Username, 'AudioFeria136');

    // Destinatario principal
    $mail->addAddress('audioferia@gmail.com');

    // Reply-To: cliente
    $mail->addReplyTo($email, $name);

    // Opcional: quitar CC al cliente para evitar spam
    // $mail->addCC($email); // <-- normalmente no es recomendable

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

    // Enviar correo
    $mail->send();
    echo 'OK';

} catch (Exception $e) {
    http_response_code(500);
    echo "Error al enviar el mensaje: {$mail->ErrorInfo}";
}
?>
