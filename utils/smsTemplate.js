function getSMSMessage(age, email) {
    return `Wellcome to Lifeshield.com Registration successful. You're ${age} years old. Check your email ${email} for vaccine guidance.`;
  }
  
  module.exports = getSMSMessage;
  