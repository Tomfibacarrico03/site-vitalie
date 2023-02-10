import React, { useState } from "react";
import styles from "./postJob.module.css";
import paper from ".././imgs/paper.webp";

const PostJob = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  var selectedOption;
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [serviceCategory, setServiceCategory] = useState(["..."]);
  const architectsCategory = [
    "Fundamental design concepts (for generating quotes and presenting planning applications)",
    "Detailed compliant blueprints (for builders and building regulations)",
    "Building structure calculations",
    "Not sure",
  ];
  const bathroomCategory = [
    "Bathroom refurbishment / installation",
    "Install or replace a fixture",
    "Repair",
    "Tiling",
    "Other",
  ];
  const BricklayingRepointingCategory = [
    "Building a wall",
    "Building a structure",
    "Building custom brickwork",
    "Wall alterations",
    "Repointing",
    "Chimney work",
    "Repairs",
  ];
  const CarpentryJoineryCategory = [
    "Doors, windows & floors",
    "Furniture making, assembly & repairs",
    "Kitchen units & worktops",
    "Decking",
    "Other carpentry work",
  ];
  const CarpetsLinoFlooringCategory = [
    "New or replacement flooring",
    "Sanding / Restoration",
    "Repair / Adjustment",
    "Other",
  ];
  const centralHeatingCategory = [
    "Boiler",
    "Pipework / supply",
    "Radiators",
    "Thermostat",
    "Underfloor heating",
    "Full system installation",
    "Other",
  ];
  const chimneyFireplaceCategory = [
    "Chimney",
    "Fireplace",
    "Flue",
    "Other or several of the above",
  ];
  const conservatoriesCategory = [
    "A new conservatory installation",
    "Replace or improve an existing conservatory",
    "A repair",
  ];
  const dampProofingCategory = [
    "No - I need help investigating",
    "Yes - I just need help fixing the problem",
  ];
  const demolitionClearanceCategory = [
    "Waste removal only",
    "Building / structure demolition",
    "Knock down a wall",
  ];
  const drivewaysPavingCategory = [
    "Install a driveway",
    "Clean or reseal a driveway",
    "Dropped kerb (crossover)",
    "Dropped kerb (crossover)",
    "Paving, patios and paths",
  ];
  const electricalCategory = [
    "Rewiring",
    "Fuseboxes",
    "Electrical fittings & appliances",
    "Safety check or certificate",
    "Electrical faults & repairs",
    "Other",
  ];
  const extensionsCategory = [
    "Property extension",
    "Loft conversion",
    "A porch",
    "Outbuilding",
    "Internal alterations",
    "Other",
  ];
  const fasciasSoffitsGutteringCategory = [
    "Guttering only",
    "Fascias and/or soffits only",
    "Both",
  ];
  const fencingCategory = [
    "Fencing",
    "Gates",
    "Fencing and gates",
    "Repair a fence or gate",
  ];
  const gardeningLandscapingCategory = [
    "General gardening",
    "Landscaping",
    "Tree Surgery",
  ];
  const gasWorkCategory = [
    "Gas safety check",
    "Service boiler or appliance",
    "Install or replace boiler or appliance",
    "Move or remove boiler or appliance",
    "Pipework only",
    "Problem or repair",
    "Other",
  ];
  const groundworkFoundationsCategory = [
    "Foundations for a structure to be built",
    "Drainage & pipework",
    "General garden earthworks",
    "Other",
  ];
  const handymanCategory = [
    "The job include eletrical work",
    "The job does not include eletrical work",
  ];
  const insulationCategory = [
    "Loft / roof insulation",
    "Wall insulation",
    "Floor insulation",
    "Other",
  ];
  const kitchenFittingCategory = [
    "New kitchen installation",
    "Worktop installation",
    "Cabinet door refurbishment / replacement",
    "Fit appliance (sink, oven, dishwasher, etc.)",
    "Minor repair",
    "Several of the above, or other",
  ];
  const locksmithCategory = [
    "Install new locks",
    "Repair locks",
    "Other (e.g. locked out)",
  ];
  const loftConversionsCategory = [
    "Loft conversion with structural changes",
    "Loft conversion (no structural changes)",
    "Loft conversion for storage purposes",
    "Fit a skylight",
  ];
  const newBuildCategory = [
    "I own the land I plan to build on",
    "I`m purchasing the land I plan to build on",
    "I don`t own the land I plan to build on",
  ];
  const paintingDecoratingCategory = [
    "Inside painting",
    "Outside painting",
    "Both",
  ];
  const plasteringRenderingCategory = [
    "Plastering (indoors)",
    "Rendering (outdoors)",
  ];
  const plumbingCategory = [
    "Radiators",
    "Boilers",
    "Appliances",
    "Fixtures",
    "Pipework, taps & drainage",
  ];
  const restorationRefurbishmentCategory = [
    "I understand that This trade is for large jobs that require management and oversight. If you require multiple jobs that cover various trades, please post these separately in the appropriate trade categories.",
  ];
  const roofingCategory = [
    "New or replacement roof",
    "Roof repair or assessment",
    "Chimney work",
    "Something else"
  ];
  const securitySystems = [
    "Security alarm system",
    "CCTV/Smart camera",
    "Entry system",
    "Smoke alarms",
    "Security lights",
    "Locks",
    "Other"
  ];
  const stonemasonryCategory = [
    "Building",
    "Repairing",
    "Repointing",
    "Other"
  ]
  const handleChange = (event) => {
    selectedOption = event.target.value;
    console.log(selectedOption);

    switch (selectedOption) {
      case "architects":
        setServiceCategory(architectsCategory);
        console.log(serviceCategory);
        break;

      case "bathroom-fitters":
        setServiceCategory(bathroomCategory);
        console.log(serviceCategory);
        break;
      case "bricklayers":
        setServiceCategory(BricklayingRepointingCategory);
        console.log(serviceCategory);
        break;
      case "carpenters-and-joiners":
        setServiceCategory(CarpentryJoineryCategory);
        console.log(serviceCategory);
        break;
      default:
        break;
    }
  };
  const handleCatergoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  function questionIncrement() {
    setQuestionNumber(questionNumber + 1);
  }
  async function questionDicrement() {
    setQuestionNumber(questionNumber - 1);
  }
  return (
    <div>
      <div className={styles.paper}>
        <img src={paper} />
      </div>
      <div className={styles.divCabecalho}>
        <h1 className={styles.title}>Post a job</h1>
        <h3 className={styles.subtitle}>
          Get your job out there and find the right tradesperson for you!
        </h3>
      </div>

      <div className={styles.divQuestions}>
        <div
          className={
            questionNumber === 1 ? styles.question : styles.displayNone
          }
        >
          <h1>What do you need your tradesperson for?</h1>
          <select
            className={styles.jobsSelect}
            value={selectedOption}
            onChange={handleChange}
          >
            <option value="">Choose a trade category</option>
            <option value="architects">Architectural Services</option>
            <option value="bathroom-fitters">Bathroom Fitting</option>
            <option value="bricklayers">Bricklaying &amp; Repointing</option>
            <option value="carpenters-and-joiners">
              Carpentry &amp; Joinery
            </option>
            <option value="carpet-flooring-fitters">
              Carpets, Lino &amp; Flooring
            </option>
            <option value="heating-engineers">Central Heating</option>
            <option value="chimney-fireplace-specialists">
              Chimney &amp; Fireplace
            </option>
            <option value="conservatories-specialists">Conservatories</option>
            <option value="conversions">Conversions</option>
            <option value="damp-proofing-specialists">Damp Proofing</option>
            <option value="demolition-specialists">
              Demolition &amp; Clearance
            </option>
            <option value="driveway-specialists">Driveways &amp; Paving</option>
            <option value="electricians">Electrical</option>
            <option value="extension-specialists">Extensions</option>
            <option value="fascias-soffits-guttering-specialists">
              Fascias, Soffits &amp; Guttering
            </option>
            <option value="fencers">Fencing</option>
            <option value="landscape-gardeners">
              Gardening &amp; Landscaping
            </option>
            <option value="gas-engineers">Gas Work</option>
            <option value="groundwork-and-foundations-specialists">
              Groundwork &amp; Foundations
            </option>
            <option value="handymen">Handyman</option>
            <option value="insulation-specialists">Insulation</option>
            <option value="kitchen-fitters">Kitchen Fitting</option>
            <option value="locksmiths">Locksmith</option>
            <option value="loft-conversion-specialists">
              Loft Conversions
            </option>
            <option value="new-builds-specialists">New Build</option>
            <option value="painters-and-decorators">
              Painting &amp; Decorating
            </option>
            <option value="plasterers">Plastering &amp; Rendering</option>
            <option value="plumbers">Plumbing</option>
            <option value="restoration-and-refurbishment-specialists">
              Restoration &amp; Refurbishment
            </option>
            <option value="roofers">Roofing</option>
            <option value="security-system-installers">Security Systems</option>
            <option value="stonemasons">Stonemasonry</option>
            <option value="tilers">Tiling</option>
            <option value="tree-surgeons">Tree Surgery</option>
            <option value="window-fitters">Windows &amp; Door Fitting</option>
            <option value="not-determined">I'm not sure which to pick</option>
          </select>
        </div>
        <div
          className={
            questionNumber === 2 ? styles.question : styles.displayNone
          }
        >
          <h1>What category of {selectedOption} are you in need of?</h1>
          {serviceCategory.map((serviceCategory, index) => (
            <label
              className={
                selectedCategory === serviceCategory
                  ? styles.categoryLabelSelected
                  : styles.categoryLabel
              }
            >
              <input
                onChange={handleCatergoryChange}
                checked={selectedCategory === serviceCategory}
                type="checkbox"
                value={serviceCategory}
                className={styles.displayNone}
              />
              <h4>{serviceCategory}</h4>
            </label>
          ))}
        </div>
        <br />
        <button
          className={
            questionNumber > 1 ? styles.continueButton : styles.displayNone
          }
          onClick={questionDicrement}
        >
          &#8592; Back
        </button>
        <button className={styles.continueButton} onClick={questionIncrement}>
          Continue &#8594;
        </button>
      </div>
    </div>
  );
};

export default PostJob;
