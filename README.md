# SoulboundToken Project

The SoulboundToken project implements a novel concept inspired by the idea of Soulbound Tokens (SBTs), as introduced by Vitalik Buterin and others in a co-authored whitepaper. These tokens represent non-transferable tokens (NTTs) that are bound to a single wallet, aiming to encapsulate more than just financial value by representing personal, educational, or professional attributes of an individual's identity.

## Overview

Soulbound Tokens are designed to be non-transferable, meaning once minted to a wallet, they cannot be moved or sold. This property makes them particularly suitable for representing certifications, memberships, or any form of identity verification that is intrinsic to a single entity.

The SoulboundToken contract allows the creation of digital identities with various attributes encapsulated within a Soul. These attributes can range from personal identification details to medical records or any custom data relevant to the soul's purpose.

## Features

- **Minting**: Creation of a new Soul token with specified attributes, bound to an Ethereum address.
- **Burning**: Destruction of a Soul token, removing the associated data and identity from the blockchain.
- **Updating**: Modification of the attributes of an existing Soul token by the contract operator.
- **Profile Interactions**: Enabling third parties and individual users to add, retrieve, and manage additional profile data associated with a Soul.

## Contract Functions

- `mint(address _soul, Soul memory _soulData)`: Mint a new Soul token to a specified address.
- `burn(address _soul)`: Burn the Soul token associated with a specified address.
- `update(address _soul, Soul memory _soulData)`: Update the Soul token data for a specified address.
- `setProfile(address _soul, Soul memory _soulData)`: Set additional profile data for a Soul token.
- `getProfile(address _profiler, address _soul)`: Retrieve the profile data set by a specific address for a Soul token.
- `listProfiles(address _soul)`: List all addresses that have set profile data for a specific Soul token.
- `removeProfile(address _profiler, address _soul)`: Remove the profile data associated with a Soul token.

## Setup and Testing

### Prerequisites

- Node.js and npm installed.
- Hardhat and Ethereum development tools.
- Etherscan API key (for contract verification).
- Infura API key (for deployment to Ethereum networks).

### Installation

1. Clone the repository.
2. Navigate to the project directory and install dependencies:

```bash
npm install
```
   

1. Compile the smart contracts:

```bash
npx hardhat compile
```

4. Run tests to verify contract functionalities:

```bash
npx hardhat test
```

### Deployment

To deploy the SoulboundToken contract to a network:

1. Configure the network settings in `hardhat.config.js`.
2. Run the deployment script with Hardhat:

```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

Replace `<network-name>` with the name of the network you wish to deploy to, as configured in `hardhat.config.js`.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues to discuss proposed changes or enhancements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

