const { default: ContactForm } = require("./components/ContactForm");

const Contact = () => {
  return (
    <div className="content-container">
      <h1 className="main-title">Send me an email!</h1>
      <ContactForm />
    </div>
  );
};

export default Contact;
