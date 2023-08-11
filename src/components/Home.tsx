import { Link } from "react-router-dom";
import Nav from "./Nav";
import Article from "./Article";

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
              <Article
                date="Aug 11, 2023"
                title="Next week I'm teaming up with 3 other founders on a startup
                hackathon. Here's what I want to learn."
                content={
                  <ul className="mt-5 text-sm leading-6 text-gray-600 list-disc text-left pl-4">
                    <li>Team: Is everyone ready to work?</li>
                    <li>Team: Can we align on a single objective?</li>
                    <li>Team: Can we deliver?</li>
                    <li>Team: Can we iterate?</li>
                    <li>Team: Are our skills meaningfully complementary?</li>
                    <li>Team: Should we continue working together?</li>
                    <li>Customer: Who is our customer?</li>
                    <li>Customer: How big is the audience?</li>
                    <li>
                      Customer: Do they have a specific problem worth solving?
                    </li>
                    <li>Customer: What's the customer's budget?</li>
                    <li>Customer: How urgent/important is the problem?</li>
                    <li>Customer: Is the problem (naturally) recurring?</li>
                    <li>Customer: How often do customers make a change?</li>
                    <li>Customer: What barriers exist to making a change?</li>
                    <li>
                      Customer: What barriers exist to customers choosing us
                      specifically?
                    </li>
                    <li>Customer: How do we find customers?</li>
                    <li>
                      Competition: How do we separate ourselves from
                      competitors?
                    </li>
                    <li>
                      Competition: Can we do something outrageously different?
                    </li>
                    <li>Product: What is the goal of the MVP?</li>
                    <li>Product: What is the MVP?</li>
                    <li>Product: Technical barriers to delivery?</li>
                    <li>Product: Do customers want our solution?</li>
                  </ul>
                }
              />
              <Article
                date="Aug 10, 2023"
                title={
                  <Link to="/is-my-startup-viable-calculator">
                    Calculator: Is My Startup Viable?
                  </Link>
                }
                content={
                  <ul className="mt-5 text-sm leading-6 text-gray-600 list-disc text-left pl-4">
                    <li>
                      Last week, my co-founder and I walked away from our
                      revenue-generating startup
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
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
