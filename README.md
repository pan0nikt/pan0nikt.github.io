<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Latające Zdjęcie</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
        }

        #flying-image {
            position: absolute;
            width: 100px; /* dostosuj rozmiar zdjęcia */
            height: auto;
            animation: flyAnimation 5s linear infinite;
        }

        @keyframes flyAnimation {
            0% {
                transform: translate(0, 0);
            }
            50% {
                transform: translate(80vw, 50vh);
            }
            100% {
                transform: translate(0, 0);
            }
        }
    </style>
</head>
<body>
    <img id="flying-image" src="link_do_twojego_zdjecia.jpg" alt="Latające Zdjęcie">
</body>
</html>
