import { Link } from "react-router-dom";
import Nav from "./Nav";

function Home() {
  return (
    <div className="pb-36">
      <Nav />
      <div className="bg-white pt-12">
        <div className="max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Brent Sullivan's Blog
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              I'm a startup founder interested in business ideation, customer
              development and scaling. I founded{" "}
              <a
                className="underline"
                href="https://www.deconstructconf.com"
                target="_blank"
                rel="noreferrer"
              >
                Deconstruct Conf
              </a>{" "}
              and have been concentrating on VC-backable scale-ups since 2021
              (mostly fintech and SaaS). Say hello on{" "}
              <a
                className="underline"
                href="https://www.linkedin.com/in/brntsllvn"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              .
            </p>
            <div className="mt-10 space-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
              <article className="max-w-xl flex-col items-start">
                <div className="flex items-center gap-x-4 text-xs"></div>
                <div className="group relative">
                  <time className="text-gray-500">Aug 4, 2023</time>
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link to="/is-my-startup-viable-calculator">
                      Calculator: Is My Startup Viable?
                    </Link>
                  </h3>
                  <ul className="mt-5 text-sm leading-6 text-gray-600 list-disc text-left pl-4">
                    <li>
                      Yesterday, my co-founder and I decided to walk away from
                      our revenue-generating startup.
                    </li>
                    <li>
                      After analyzing our target audience, business model, and
                      product, it was painfully, and embarassingly, obvious we
                      were headed in the wrong direction.
                    </li>
                    <li>
                      Our "ah-ha" moment came from Jason Cohen's{" "}
                      <a
                        className="underline"
                        href="https://longform.asmartbear.com/problem/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Excuse me, is there a problem?
                      </a>
                    </li>
                    <li>
                      The calculator in Jason's blog provides an{" "}
                      <a
                        className="underline"
                        href="https://longform.asmartbear.com/roi-rubric/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        order-of-magnitude estimation
                      </a>{" "}
                      of the viability of a startup.
                    </li>
                    <li>
                      The calculator is the best proxy for investor feedback
                      I've seen. It's valuable for assessing
                      lifestyle/self-funded ideas too.
                    </li>
                    <li>
                      I wish we had the calculator before talking to customers,
                      building and pitching. It would have saved us a lot of
                      time.
                    </li>
                    <li>
                      Try the{" "}
                      <a
                        className="underline"
                        href="/is-my-startup-viable-calculator"
                      >
                        calculator
                      </a>
                      .
                    </li>
                  </ul>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
