function emailVerify(url) {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>PokEbay Email</title>
    <style type="text/css">
    body {
        margin: 0;
        background-color: #cccccc;
    }
    table {
        border-spacing: 0;
    }
    td {
        padding: 0;
    }
    img {
        border: 0;
    }
    .wrapper {
        width: 100%;
        table-layout: fixed;
        background-color: #cccccc;
        padding-bottom: 60px;
    }
    .main {
        background-color: #ffffff;
        margin: 0 auto;
        width: 100%;
        max-width: 600px;
        border-spacing: 0;
        font-family: sans-serif;
        color: #171a1b;
    }
    .button {
        background-color: #fc9700;
        color: #171a1b;
        text-decoration: none;
        padding: 12px 20px;
        border-radius: 5px;
        font-weight: bold;
    }
    .thankyou {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    </style>
</head>
<body>
<center class="wrapper">
<table class="main" width="100%">
    <!-- TOP BORDER -->
    <tr>
    <td height="8" style="background-color: #fc9700"></td>
    </tr>

    <!-- LOGO SECTION -->
    <tr>
    <td style="padding: 14px 0 4px">
        <table width="100%">
        <tr>
            <td style="text-align: center; font-size: 0;">
            <table style="width: 100%; max-width: 300px; display: inline-block; vertical-align: top;">
                <tr>
                <td style="padding: 0 62px 10px">
                    <a href="https://grace-pokebay.herokuapp.com/"
                    ><img
                        src="https://i.ibb.co/3cRCmhN/logo.png"
                        alt="logo"
                        width="100"
                        title="PokEbay"
                    /></a>
                </td>
                </tr>
            </table>
            <table style="width: 100%; max-width: 300px; display: inline-block; vertical-align: top;">
                <tr>
                <td style="padding: 10px 72px">
                    <a href="#"
                    ><img
                        src="https://i.ibb.co/f10v8MN/black-facebook.png"
                        alt=""
                        width="30"
                    /></a>
                    <a href="#"
                    ><img
                        src="https://i.ibb.co/B6dCFFP/black-twitter.png"
                        alt=""
                        width="30"
                    /></a>
                    <a href="#"
                    ><img
                        src="https://i.ibb.co/ChQxBmh/black-youtube.png"
                        alt=""
                        width="30"
                    /></a>
                    <a href="https://www.linkedin.com/in/andrey-statkevskiy/"
                    ><img
                        src="https://i.ibb.co/tBSQsSK/black-linkedin.png"
                        alt=""
                        width="30"
                    /></a>
                    <a href="https://www.instagram.com/andstatik/"
                    ><img
                        src="https://i.ibb.co/jy0GK47/black-instagram.png"
                        alt=""
                        width="30"
                    /></a>
                </td>
                </tr>
            </table>
            </td>
        </tr>
        </table>
    </td>
    </tr>

    <!-- CONFIRM -->

    <tr class="thankyou">
    <td style="padding: 0px 50px; text-align:center">
      <p style="font-weight: bold; font-size: 26px;">
        Verify your email address!
      </p>
      <p style="padding: 0px 50px">
        This email address was recently used to log into PokEbay application. If this was you, please verify your email address by clicking the following link:
      </p>
      <a href="${url}" class="button">Verify</a>
      <p>
        If this was not you, you can safely delete this email.
      </p>
    </td>
    </tr>

    <!-- FOOTER SECTION -->

    <tr>
    <td style="background-color: #271538">
        <table width="100%">
        <tr>
            <td
            style="text-align: center; padding: 45px 20px; color: #ffffff"
            >
            <a href="https://grace-pokebay.herokuapp.com/"
                ><img src="https://i.ibb.co/3cRCmhN/logo.png" width="180"
            /></a>
            <p style="padding: 10px">PokeBay</p>
            <p style="padding: 10px">
                123 Street Road, City, State 55555
            </p>
            <a href="#"
                ><img
                src="https://i.ibb.co/0BtKbbs/white-facebook.png"
                alt=""
                width="30"
            /></a>
            <a href="#"
                ><img
                src="https://i.ibb.co/5xDjDcy/white-twitter.png"
                alt=""
                width="30"
            /></a>
            <a href="#"
                ><img
                src="https://i.ibb.co/5Y2Zn7R/white-youtube.png"
                alt=""
                width="30"
            /></a>
            <a href="https://www.linkedin.com/in/andrey-statkevskiy/"
                ><img
                src="https://i.ibb.co/JsZM3yp/white-linkedin.png"
                alt=""
                width="30"
            /></a>
            <a href="https://www.instagram.com/andstatik/"
                ><img
                src="https://i.ibb.co/ZM8pcrn/white-instagram.png"
                alt=""
                width="30"
            /></a>
            <p style="padding: 10px">SUBSCRIBE</p>
            </td>
        </tr>
        </table>
    </td>
    </tr>
</table>
</center>
</body>
</html>
`
}

module.exports = emailVerify;