import React, { useState } from "react";
import { jsPDF } from "jspdf";
import Nav from "./Nav";

interface Option {
  value: number;
  label: string;
}

interface InputProps {
  label: string;
  subscript: string;
  guidance: string;
  readMoreURL: string;
  readMoreLabel: string;
  options: Option[];
  onResultChange: (result: number) => void;
  onOptionChange: (option: string) => void;
  selectedOption: string;
}

const InputWithDropdown: React.FC<InputProps> = ({
  label,
  subscript,
  guidance,
  readMoreURL,
  readMoreLabel,
  options,
  onResultChange,
  onOptionChange,
  selectedOption,
}) => {
  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onOptionChange(selectedValue);
    const selectedOption = options.find(
      (option) => option.label === selectedValue
    );
    if (selectedOption) {
      const result = selectedOption.value;
      onResultChange(result);
    }
  };

  return (
    <div className="py-2 pb-1">
      <div>{label}</div>
      <div className="text-[9px]">{`Estimate: ${subscript}`}</div>
      <div className="text-[9px] font-bold">{`Jason's guidance: ${guidance}`}</div>
      <div className="text-[9px]">
        Read more:{" "}
        <a className="underline" href={readMoreURL}>
          {readMoreLabel}
        </a>
      </div>
      <div>
        <select
          value={selectedOption || ""}
          onChange={handleOptionChange}
          className="form-select mt-1 block w-full rounded-md bg-white-200 text-gray-800"
        >
          <option value="" disabled>
            Select an option
          </option>
          {options.map((option) => (
            <option className="text-sm" key={option.value} value={option.label}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const ViableStartupCalculator: React.FC = () => {
  const [inputResults, setInputResults] = useState<number[]>([
    0, 0, 0, 0, 0, 0, 0,
  ]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [businessLabels, setBusinessLabels] = useState<string[]>(["", ""]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    let yPos = 20;
    let yGap = 4;
    let xPos = 10;
    let titleSize = 10;
    let textSize = 8;

    doc.setFontSize(12);
    doc.text("Is My Startup Viable?", xPos, yPos);
    yPos += yGap;

    doc.setFontSize(textSize - 3);
    doc.text(
      "Jason Cohen's 'Excuse me, is there a problem?' (https://longform.asmartbear.com/problem/)",
      xPos,
      yPos
    );
    yPos += yGap - 1;
    doc.text("Calculator (www.adthatch.com/is-my-startup-viable)", xPos, yPos);
    yPos += yGap - 1;
    doc.text(
      "Say hello (https://www.linkedin.com/in/brent-sullivan-350230209/)",
      xPos,
      yPos
    );
    yPos += yGap + 5;

    doc.setFontSize(titleSize);
    doc.text("Name of Startup", xPos, yPos);
    yPos += yGap;
    doc.setFontSize(textSize);
    doc.text(businessLabels[0], xPos, yPos);
    yPos += yGap;

    yPos += yGap;
    doc.setFontSize(titleSize);
    doc.text("Startup Idea", xPos, yPos);
    yPos += yGap;
    doc.setFontSize(textSize);
    doc.text(businessLabels[1], xPos, yPos);
    yPos += yGap;

    optionsArray.forEach((option, index) => {
      yPos += yGap;
      doc.setFontSize(titleSize);
      doc.text(option.label, xPos, yPos);
      yPos += yGap;
      doc.setFontSize(textSize);
      doc.text(selectedOptions[index], xPos, yPos);
      yPos += yGap;
    });

    yPos += yGap;
    doc.setFontSize(titleSize);
    doc.text(`Score: ${totalResult.toFixed(2)}`, xPos, yPos); // rounded to two decimal places
    yPos += yGap;
    doc.setFontSize(textSize);
    doc.text(`Result: ${calculateResult(totalResult)}`, xPos, yPos);
    doc.setFontSize(textSize - 3);
    yPos += yGap + 5;
    const timestamp =
      new Date().toISOString().replace("T", " ").split(".")[0] + " UTC";
    doc.text(`Calculated ${timestamp}`, xPos, yPos);

    doc.save("Startup_Details.pdf");
  };

  const handleInputOptionChange = (index: number, option: string) => {
    setSelectedOptions((prevOptions) => {
      const newOptions = [...prevOptions];
      newOptions[index] = option;
      return newOptions;
    });
  };

  const handleFillExampleData = (
    exampleBusinessName: string,
    exampleBusinessH1: string,
    exampleData: { result: number; option: string }[]
  ) => {
    const exampleResults = exampleData.map((data) => data.result);
    setInputResults(exampleResults);
    const exampleOptions = exampleData.map((data) => data.option);
    setSelectedOptions(exampleOptions);
    setBusinessLabels([exampleBusinessName, exampleBusinessH1]);
  };

  const handleInputResultChange = (index: number, result: number) => {
    setInputResults((prevResults) => {
      const newResults = [...prevResults];
      newResults[index] = result;
      return newResults;
    });
  };

  const calculateTotalResult = () => {
    return inputResults.reduce((total, result) => total * result, 1) / 625000;
  };

  const totalResult = calculateTotalResult();

  const calculateResult = (totalResult: number) => {
    if (totalResult >= 4) {
      return "Scale Up";
    } else if (totalResult >= 2) {
      return "Self-Fund";
    } else if (totalResult === 0) {
      return "TBD";
    } else {
      return "Not viable";
    }
  };

  const calculateResultColor = (totalResult: number) => {
    if (totalResult >= 4) {
      return "bg-green-400";
    } else if (totalResult >= 2) {
      return "bg-green-200";
    } else if (totalResult >= 1) {
      return "bg-red-400";
    } else if (totalResult >= 0.1) {
      return "bg-red-500";
    } else if (totalResult === 0) {
      return "bg-stone-200";
    } else {
      return "bg-red-600";
    }
  };

  let bgColorClass = calculateResultColor(totalResult);

  const optionsArray = [
    {
      label: "Audience Size",
      subscript: "Number of potential customers (consumers or businesses)",
      guidance: "10M+ people or 100k+ orgs have the problem?",
      readMoreURL: "https://longform.asmartbear.com/roi-rubric/",
      readMoreLabel: "Fermi Estimation",
      options: [
        { value: 1000000000, label: "1,000,000,000" },
        { value: 100000000, label: "100,000,000" },
        { value: 10000000, label: "10,000,000" },
        { value: 1000000, label: "1,000,000" },
        { value: 100000, label: "100,000" },
        { value: 10000, label: "10,000" },
        { value: 1000, label: "1,000" },
      ],
    },
    {
      label: "Self-Aware Market",
      subscript: "Does the audience know and care they have the problem?",
      guidance:
        "Confirm the problem is real, prospects agree and solving it is a priority",
      readMoreURL: "https://longform.asmartbear.com/customer-development/",
      readMoreLabel: "Customer Development",
      options: [
        { value: 0.01, label: "0.01: Few agree or care" },
        {
          value: 0.1,
          label: "0.1: Thought-leaders care/evangelize",
        },
        { value: 0.5, label: "0.5: Industry standard-practice" },
        {
          value: 1.0,
          label: "1.0: Hard to find someone who doesn't care",
        },
      ],
    },
    {
      label: "Lucrative Market",
      subscript: "Annual allocated budget",
      guidance:
        "Confirm the audience has enough money available and budgeted to solve the problem",
      readMoreURL:
        "https://longform.asmartbear.com/pricing-determines-your-business-model/",
      readMoreLabel: "Pricing Determines Your Business Model",
      options: [
        { value: 1000000, label: "$1,000,000" },
        { value: 100000, label: "$100,000" },
        { value: 10000, label: "$10,000" },
        { value: 1000, label: "$1,000" },
        { value: 100, label: "$100" },
        { value: 10, label: "$10" },
        { value: 1, label: "$1" },
      ],
    },
    {
      label: "Liquid Market",
      subscript:
        "How often do your customers make a purchase decsion and how hard is it to switch?",
      guidance:
        "Find all the frictions that prevent purchase (e.g. long-term contract, difficult in moving data, cross-system integrations, etc.)",
      readMoreURL: "TBD",
      readMoreLabel: "TBD",
      options: [
        { value: 0.01, label: "0.01: Every few years, hard to switch" },
        { value: 0.1, label: "0.1: Once a year, moderate challenge to switch" },
        {
          value: 1.0,
          label: "1.0: Always in the market, easy to switch",
        },
      ],
    },
    {
      label: "Eager To Buy From You Specifically?",
      subscript: "Attitude towards your company",
      guidance:
        "Do prospects trust you, your product, track record, security standards, customer service, ability to scale, etc.",
      readMoreURL: "TBD",
      readMoreLabel: "TBD",
      options: [
        { value: 0, label: "0: They cannot buy from you" },
        { value: 0.1, label: "0.1: Serious trust challenges" },
        { value: 0.5, label: "0.5: Indifferent or low-trust product" },
        { value: 1.0, label: "1.0: Emotional desire to select you" },
      ],
    },
    {
      label: "Eager To Buy From You Versus Competition?",
      subscript: "Competitive differentiation",
      guidance:
        "Do you have something unique and does a big chunk of the market care about that thing?",
      readMoreURL: "https://longform.asmartbear.com/willingness-to-pay/",
      readMoreLabel: "Willingness to Pay",
      options: [
        { value: 0.1, label: "0.1: No material differentiation" },
        { value: 0.5, label: "0.5: Some best-in-class features" },
        { value: 1.0, label: "1.0: No viable alternative" },
      ],
    },
    {
      label: "Enduring",
      subscript: "Will they still be a customer a year from now?",
      guidance:
        "5%/mo cancellation means only half the customers will still be customers a year from now. One-time revenue businesses still need repeat revenue",
      readMoreURL:
        "https://cloud.substack.com/p/my-top-10-mistakes-in-10-years-gainsight#%C2%A7mistake-not-starting-act-ii-fast-enough",
      readMoreLabel: "Impossible to become a scale-up unicorn with high churn",
      options: [
        { value: 0.01, label: "0.01: One-off purchase without loyalty" },
        { value: 0.1, label: "0.1: One-off purchase with evangelism" },
        { value: 0.5, label: "0.5: Recurring revenue or problem" },
        { value: 1.0, label: "1.0: Strong lock-in" },
      ],
    },
  ];

  const exampleArray = [
    {
      businessName: "WP Engine",
      businessH1: "Hosting for WordPress",
      data: [
        { result: 100000000, option: "100,000,000" },
        { result: 0.1, option: "0.1: Thought-leaders care/evangelize" },
        { result: 100, option: "$100" },
        { result: 0.01, option: "0.01: Every few years" },
        { result: 0.5, option: "0.5: Indifferent" },
        { result: 0.5, option: "0.5: Some best-in-class features" },
        { result: 1.0, option: "1.0 : Strong lock-in" },
      ],
    },
    {
      businessName: "ConvertKit",
      businessH1: "Marketing for creators",
      data: [
        { result: 10000000, option: "10,000,000" },
        { result: 1.0, option: "1.0: Hard to find someone who doesn't care" },
        { result: 100, option: "$100" },
        { result: 0.01, option: "0.01: Every few years" },
        { result: 0.5, option: "0.5: Indifferent" },
        { result: 0.5, option: "0.5: Some best-in-class features" },
        { result: 0.5, option: "0.5 : Recurring-revenue + recurring-problem" },
      ],
    },
    {
      businessName: "Consumer Security",
      businessH1: "Help people protect their data",
      data: [
        { result: 1000000000, option: "1,000,000,000" },
        { result: 0.01, option: "0.01: Few agree or care" },
        { result: 10, option: "$10" },
        { result: 0.01, option: "0.01: Every few years" },
        { result: 0.5, option: "0.5: Indifferent" },
        { result: 0.1, option: "0.1: No material differentiation" },
        { result: 0.5, option: "0.5 : Recurring-revenue + recurring-problem" },
      ],
    },
  ];

  return (
    <div>
      <Nav />
      <div className="min-h-min flex items-center justify-center px-2 mt-8">
        <div
          className={`w-full max-w-md mx-auto px-4 py-8 ${bgColorClass} rounded-lg shadow-md`}
        >
          <h1 className="text-black text-2xl font-bold text-center mb-2">
            Is My Startup Viable?
          </h1>
          <div className="text-[8px] text-center mb-1">
            Based on Jason Cohen's{" "}
            <a
              className="underline"
              href="https://longform.asmartbear.com/problem/"
              target="_blank"
              rel="noreferrer"
            >
              Excuse me, is there a problem?
            </a>
          </div>
          <div className="text-[8px] text-center mb-4">
            See{" "}
            <a
              className="underline"
              href="https://longform.asmartbear.com/roi-rubric/"
              target="_blank"
              rel="noreferrer"
            >
              Fermi Estimation
            </a>{" "}
            for why this calculator is useful
          </div>
          <div className="flex justify-between items-center mt-2 px-4">
            <div className="text-black font-semibold text-sm">
              Score: {totalResult}
            </div>
            <div className="text-black font-semibold text-sm">
              Result: {calculateResult(totalResult)}
            </div>
            <button
              onClick={downloadPDF}
              className="text-black font-semibold text-sm border border-gray-300 py-1 px-2 rounded-lg"
            >
              Save as PDF
            </button>
          </div>
          <div>
            <div className="flex items-center mt-4 px-4 text-[8px] text-black gap-3">
              <div>Examples</div>
              {exampleArray.map((example) => (
                <button
                  className="border border-gray-300 py-1 px-2 rounded-lg"
                  onClick={() =>
                    handleFillExampleData(
                      example.businessName,
                      example.businessH1,
                      example.data
                    )
                  }
                >
                  {example.businessName}
                </button>
              ))}
            </div>
            <div className="px-4 mt-6">
              <div className="bg-gray-300 h-0.5"></div>
            </div>
            <div className="rounded-lg mt-4">
              <div className="py-2 pb-1">
                <label className="block">
                  <span className="text-black">Name of startup</span>
                  <div className="text-[9px] pb-1">
                    Helpful for capturing the business in one(ish) word
                  </div>
                  <input
                    className="form-input block w-full rounded-md bg-white-200 text-black text-sm p-2 h-5"
                    type="text"
                    value={businessLabels[0]}
                  />
                </label>
              </div>
              <div className="py-2 pb-1">
                <label className="block">
                  <span className="text-black">
                    Startup idea in one sentence
                  </span>
                  <div className="text-[9px] pb-1">
                    What would the "h1" tag on your main landing page say?
                  </div>
                  <input
                    className="form-input block w-full rounded-md bg-white-200 text-black text-sm p-2 h-5"
                    type="text"
                    value={businessLabels[1]}
                  />
                </label>
              </div>
            </div>
            {optionsArray.map((optionData, index) => (
              <InputWithDropdown
                key={index}
                label={optionData.label}
                subscript={optionData.subscript}
                guidance={optionData.guidance}
                readMoreURL={optionData.readMoreURL}
                readMoreLabel={optionData.readMoreLabel}
                options={optionData.options}
                onResultChange={(result) =>
                  handleInputResultChange(index, result)
                }
                onOptionChange={(option) =>
                  handleInputOptionChange(index, option)
                }
                selectedOption={selectedOptions[index]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViableStartupCalculator;
