function getOTPEmailMessage(otp) {
    return `
     <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>OTP Verification</title>
      </head>
      <body style="background-color: #f4f4f4; padding: 20px; font-family: Arial, sans-serif;">
          <table width="100%" cellspacing="0" cellpadding="0">
              <tr>
                  <td align="center">
                      <table width="600" cellspacing="0" cellpadding="0" style="background-color:#ffffff; padding: 20px; border-radius: 8px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); max-width: 100%;">
                          <tr>
                              <td align="center">
                                  <h2 style="color: #4f46e5;">OTP Verification</h2>
                                  <p style="font-size: 16px;">Your OTP for verification is:</p>
                                  <h3 style="color: #4f46e5; font-size: 30px; font-weight: bold;">${otp}</h3>
                                  <p style="color:#777; font-size: 14px;">This OTP is valid for the next 10 minutes.</p>
                                  <p style="font-size: 14px; color: #555;">If you did not request this OTP, please ignore this email.</p>
                                  <p style="color:#777; font-size: 12px;">For any queries, contact support.</p>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </body>
      </html>
    `;
}
  
module.exports = getOTPEmailMessage;
