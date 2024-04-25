import emailjs from "@emailjs/browser";

const sendNotificationEmail = (
    sender,
    senderEmail,
    receiver,
    receiverEmail,
    message,
    sbuject
  ) => {
    emailjs
      .send(
        "service_e37gjno",
        "template_c69m2ru",
        {
          from_name: sender,
          from_email: senderEmail,
          to_email: receiverEmail,
          to_name: receiver,
          subject: sbuject,
          message: message,
        },
        { publicKey: "rASlZgWjQ3kN4qzUG", privateKey: "CQFRfh6s1JpgbDaD3nWlH" }
      )
      .then(
        function (response) {
          console.log("Email sent successfully!", response);
          // Handle success
        },
        function (error) {
          console.error("Email sending failed:", error);
          // Handle error
        }
      );
  };

  const emailNotify = {
    sendNotificationEmail
  };

  export default emailNotify;
