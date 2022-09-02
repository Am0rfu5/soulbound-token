const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SoulboundToken", function () {
  let SoulboundToken;
  let sbt;
  let owner;
  let addr1;
  let addr2;

  beforeEach(async function () {
    // Deploy the contract before each test
    SoulboundToken = await ethers.getContractFactory("SoulboundToken");
    [owner, addr1, addr2] = await ethers.getSigners();
    sbt = await SoulboundToken.deploy("SoulboundToken", "SBT");

    await sbt.deployed();
  });

  describe("Minting", function () {
    it("Should mint a new soul", async function () {
      const soulData = {
        patientIdentityNumber: 1,
        identity: "Jimmy Doe",
        town: "BlockTown",
        street: "Ether Street",
        streetNumber: 4232,
        postCode: "99999",
        sicknessIdentity: "None",
        lastTestRecord: "None",
        findings: "Healthy",
        treatment: "None",
        treatmentIndications: "None",
        annotations: "None",
        plannedVisits: "None",
      };

      await sbt.connect(owner).mint(addr1.address, soulData);

      expect(await sbt.hasSoul(addr1.address)).to.equal(true);
      const retrievedSoul = await sbt.getSoul(addr1.address);

      // Simplified check for demonstration; consider checking each field
      expect(retrievedSoul.identity).to.equal(soulData.identity);
    });
  });

  describe("Burning", function () {
    it("Should allow the owner or operator to burn a soul", async function () {
      // Assume mint has already been done in a beforeEach or previous test
      await sbt.connect(owner).burn(addr1.address);
      expect(await sbt.hasSoul(addr1.address)).to.equal(false);
    });
  
    it("Prevents non-owners from burning a soul", async function () {
      await expect(sbt.connect(addr2).burn(addr1.address)).to.be.revertedWith("Only users and issuers have rights to delete their data");
    });
  });

  describe("Updating", function () {
    it("Should allow the operator to update soul data", async function () {
      // First, mint a soul to update
      // Assuming minting was done in a previous test or beforeEach
  
      const updatedSoulData = {
        patientIdentityNumber: 1,
        identity: "Jane Doe Updated",
        town: "BlockCity",
        street: "Solidity Lane",
        streetNumber: 42,
        postCode: "ETH123",
        sicknessIdentity: "Updated",
        lastTestRecord: "Updated",
        findings: "Updated",
        treatment: "Updated",
        treatmentIndications: "Updated",
        annotations: "Updated",
        plannedVisits: "Updated",
      };
  
      await sbt.connect(owner).update(addr1.address, updatedSoulData);
      const updatedSoul = await sbt.getSoul(addr1.address);
  
      expect(updatedSoul.identity).to.equal(updatedSoulData.identity);
    });
  
    it("Prevents non-operator from updating soul data", async function () {
      // Updated data for testing
      const updatedSoulData = {
        patientIdentityNumber: 2,
        identity: "Unauthorized Update Attempt",
        town: "Unauthorized Town",
        street: "Unauthorized Street",
        streetNumber: 0, // Assuming streetNumber is a uint8 in your contract
        postCode: "00000",
        sicknessIdentity: "Unauthorized SicknessIdentity",
        lastTestRecord: "Unauthorized LastTestRecord",
        findings: "Unauthorized Findings",
        treatment: "Unauthorized Treatment",
        treatmentIndications: "Unauthorized TreatmentIndications",
        annotations: "Unauthorized Annotations",
        plannedVisits: "Unauthorized PlannedVisits"
      };
    
      // Attempt to update with a non-operator account (e.g., addr1 trying to update their own or another's soul data)
      await expect(sbt.connect(addr1).update(addr1.address, updatedSoulData))
        .to.be.revertedWith("Only operator can update soul data");
    });
    
  });
  
  describe("Profile Interactions", function () {
    it("Should allow setting and retrieving a profile", async function () {
      // Assuming a soul has been minted for addr1
  
      const profileData = {
        patientIdentityNumber: 2,
        identity: "Profile Identity",
        town: "Profile Town",
        street: "Profile Street",
        streetNumber: 10,
        postCode: "PST123",
        sicknessIdentity: "None",
        lastTestRecord: "2023-01-01",
        findings: "Good Health",
        treatment: "None",
        treatmentIndications: "Regular Checkup",
        annotations: "No allergies",
        plannedVisits: "2023-06-01"
      };
        
      await sbt.connect(addr2).setProfile(addr1.address, profileData);
      const retrievedProfile = await sbt.getProfile(addr2.address, addr1.address);
  
      expect(retrievedProfile.identity).to.equal(profileData.identity);
    });
  
    it("Should list all profiles associated with a soul", async function () {
      // Assuming profiles have been set for addr1 by multiple accounts
      const profiles = await sbt.listProfiles(addr1.address);
      expect(profiles).to.include(addr2.address);
    });
  
    it("Should allow removing a profile", async function () {
      // addr1 removes addr2's profile
      await sbt.connect(addr1).removeProfile(addr2.address, addr1.address);
      const hasProfile = await sbt.hasProfile(addr2.address, addr1.address);
  
      expect(hasProfile).to.equal(false);
    });
  });
  
});
