function emailGuest() {
    return `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Modern HTML Email Template</title>
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
            .two-columns {
                text-align: center;
                font-size: 0;
            }
            .two-columns .column {
                width: 100%;
                max-width: 300px;
                display: inline-block;
                vertical-align: top;
            }
            .three-columns {
                text-align: center;
                font-size: 0;
                padding: 15px 0 25px;
            }
            .three-columns .column {
                width: 100%;
                max-width: 200px;
                display: inline-block;
                vertical-align: top;
            }
            .three-columns .padding {
                padding: 15px;
            }
            .three-columns .content {
                font-size: 15px;
                line-height: 20px;
                padding: 0 5px;
            }
            .two-columns.last {
                padding: 15px 0;
            }
            .two-columns.padding {
                padding: 20px;
            }
            .two-columns.content {
                font-size: 15px;
                line-height: 20px;
                text-align: left;
            }
            .button {
                background-color: #ffffff;
                color: #171a1b;
                text-decoration: none;
                padding: 12px 20px;
                border-radius: 5px;
                font-weight: bold;
            }
            .button-dark {
                background-color: #171a1b;
                color: #ffffff;
                text-decoration: none;
                padding: 12px 20px;
                border-radius: 5px;
                font-weight: bold;
            }
            </style>
        </head>
    <body>
        <center class="wrapper">
        <table class="main" width="100%">
            <!-- TOP BORDER -->
            <tr>
            <td height="8" style="background-color: #171a1b"></td>
            </tr>

            <!-- LOGO SECTION -->
            <tr>
            <td style="padding: 14px 0 4px">
                <table width="100%">
                <tr>
                    <td class="two-columns">
                    <table class="column">
                        <tr>
                        <td style="padding: 0 62px 10px">
                            <a href="https://grace-pokebay.herokuapp.com/"
                            ><img
                                src="https://ibb.co/kXmS2c8"
                                alt="logo"
                                width="100"
                                title="PokEbay"
                            /></a>
                        </td>
                        </tr>
                    </table>
                    <table class="column">
                        <tr>
                        <td style="padding: 10px 72px">
                            <a href="#"
                            ><img
                                src="https://ibb.co/2nKN8qM"
                                alt=""
                                width="30"
                            /></a>
                            <a href="#"
                            ><img
                                src="https://ibb.co/M1WCQQh"
                                alt=""
                                width="30"
                            /></a>
                            <a href="#"
                            ><img
                                src="https://ibb.co/72K7vj2"
                                alt=""
                                width="30"
                            /></a>
                            <a href="#"
                            ><img
                                src="https://ibb.co/v1bVPbq"
                                alt=""
                                width="30"
                            /></a>
                            <a href="#"
                            ><img
                                src="https://ibb.co/StY0Tvq"
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

            <!-- BANNER IMAGE -->

            <tr>
            <td>
                <a href="#"
                ><img
                    src="https://ibb.co/9TB7SQS"
                    width="600"
                    style="max-width: 100%"
                    alt=""
                /></a>
            </td>
            </tr>

            <!-- THREE COLUMN SECTION -->

            <tr>
            <td>
                <table width="100%">
                <tr>
                    <td class="three-columns">
                    <table class="column">
                        <tr>
                        <td class="padding">
                            <table class="content">
                            <tr>
                                <td>
                                <a href="#"
                                    ><img
                                    src="https://ibb.co/jTxkH1Y"
                                    width="130"
                                    style="max-width: 130px"
                                    alt=""
                                /></a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <p style="font-weight: bold; font-size: 17px">
                                    Ecommerce
                                </p>
                                <p>Ecommerce paragraph</p>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                    <table class="column">
                        <tr>
                        <td class="padding">
                            <table class="content">
                            <tr>
                                <td>
                                <a href="#"
                                    ><img
                                    src="https://ibb.co/BByMvtz"
                                    width="130"
                                    style="max-width: 130px"
                                    alt=""
                                /></a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <p style="font-weight: bold; font-size: 17px">
                                    Web Design
                                </p>
                                <p>Web Design paragraph</p>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                    <table class="column">
                        <tr>
                        <td class="padding">
                            <table class="content">
                            <tr>
                                <td>
                                <a href="#"
                                    ><img
                                    src="https://ibb.co/84CdrYf"
                                    width="130"
                                    style="max-width: 130px"
                                    alt=""
                                /></a>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                <p style="font-weight: bold; font-size: 17px">
                                    HTML Email
                                </p>
                                <p>HTML Email paragraph</p>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                </table>
            </td>
            </tr>

            <!-- TWO COLUMN SECTION -->

            <tr>
            <td style="background-color: #26292b; color: #ffffff">
                <table width="100%">
                <tr>
                    <td class="two-columns last">
                    <table class="column">
                        <tr>
                        <td class="padding">
                            <table class="content">
                            <tr>
                                <td>
                                <a href="#"
                                    ><img
                                    src="https://ibb.co/jT9Kndm"
                                    width="260"
                                    style="max-width: 260px"
                                    alt=""
                                /></a>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                    <table class="column">
                        <tr>
                        <td class="padding">
                            <table class="content">
                            <tr>
                                <td>
                                <p style="font-weight: bold; font-size: 18px">
                                    Create Custom Designs
                                </p>
                                <p style="padding-bottom: 16px">
                                    Create Custom Designs Paragraph
                                </p>
                                <a href="#" class="button">Read More</a>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                </table>
            </td>
            </tr>

            <!-- TITLE, TEXT & BUTTON -->

            <tr>
            <td style="padding: 15px 0 50px">
                <table width="100%">
                <tr>
                    <td style="text-align: center; padding: 15px">
                    <p style="font-size: 20px; font-weight: bold">
                        HTML Email Template
                    </p>
                    <p
                        style="
                        line-height: 23px;
                        font-size: 15px;
                        padding: 5px 0 15px;
                        "
                    >
                        Email Template Paragraph
                    </p>
                    <a href="#" class="button-dark">View</a>
                    </td>
                </tr>
                </table>
            </td>
            </tr>

            <!-- FOOTER SECTION -->

            <tr>
            <td style="background-color: #26292b">
                <table width="100%">
                <tr>
                    <td
                    style="text-align: center; padding: 45px 20px; color: #ffffff"
                    >
                    <a href="#"
                        ><img src="https://ibb.co/kXmS2c8" width="180"
                    /></a>
                    <p style="padding: 10px">Modern HTML Email</p>
                    <p style="padding: 10px">
                        123 Street Road, City, State 55555
                    </p>
                    <a href="#"
                        ><img
                        src="https://ibb.co/B4NGMMn"
                        alt=""
                        width="30"
                    /></a>
                    <a href="#"
                        ><img
                        src="https://ibb.co/bRhvhdZ"
                        alt=""
                        width="30"
                    /></a>
                    <a href="#"
                        ><img
                        src="https://ibb.co/yhV2Y3Q"
                        alt=""
                        width="30"
                    /></a>
                    <a href="#"
                        ><img
                        src="https://ibb.co/DRdSr8M"
                        alt=""
                        width="30"
                    /></a>
                    <a href="#"
                        ><img
                        src="https://ibb.co/BCZ5TJX"
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

module.exports = emailGuest;