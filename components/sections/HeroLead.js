export default function HeroLead() {
  return (
    <section className="container section-spacing grid grid-flow-row gap-7 justify-center">
      <h2 className="text-3xl">Get started by creating your account</h2>
      <SignupForm />
    </section>
  );
}

const SignupForm = () => (
  <form className="w-full flex flex-col justify-center gap-2">
    <input
      type="text"
      placeholder="Enter your email"
      className="input input-bordered w-full border-primary"
    />
    <p className="text-black/50 text-sm">
      *You'll recieve an email confirmation once you have signed up
    </p>
  </form>
);
