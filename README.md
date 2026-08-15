# ✈️ AeroSure Protocol

> Fully Autonomous, Decentralized Parametric Flight Insurance powered by GenLayer.

AeroSure revolutionizes the travel insurance industry by removing human claims adjusters entirely. Built on the **GenLayer** network, AeroSure utilizes Intelligent Contracts (LLM-driven smart contracts) to autonomously query live aviation web data, instantly adjudicate flight delays, and execute payouts directly to users' wallets.

![AeroSure Dashboard Demo](https://aerosure-app.vercel.app/favicon.ico)

---

## 🌟 Core Features

- **🧠 Intelligent Claims Adjudication**: Instead of waiting weeks for a human to review a claim, GenLayer's LLM consensus actively browses live internet data to verify flight statuses and processes claims instantly.
- **⚡ Dynamic Risk Pricing**: Premiums and potential payouts are calculated dynamically at the time of purchase based on historical delay risks for specific flight routes.
- **🛡️ Seamless Web3 Onboarding**: Integrated with **Privy** and **Wagmi**, allowing native Web3 users to connect via WalletConnect, and Web2 users to seamlessly onboard using Email logins.
- **🎨 Bespoke UX / UI**: Designed from the ground up with a strict, ultra-premium B2B Claymorphism design system. Features extreme motion design including 3D tilt tracking, staggered spring typography, and custom interactive cursor followers via `framer-motion`.

## 🏗️ Technical Architecture

AeroSure consists of two primary layers:

1. **Intelligent Contract (GenLayer)**
   - Written in Python (`contracts/aerosure.py`).
   - Successfully deployed to the GenLayer Testnet at `0x6B...A5fa`.
   - Replaces traditional Chainlink Oracles with autonomous LLM consensus using `gl.eq_principle.prompt_non_comparative`.
2. **Frontend Interface (React + Vite)**
   - Built with React, TypeScript, and Vite.
   - Styling: Pure custom CSS (Premium Claymorphism).
   - Animation: `framer-motion` (Spring physics, 3D transformations).
   - Auth & Web3: `@privy-io/react-auth`, `wagmi`, `viem`.

---

## 📜 Deployed Intelligent Contract

The exact intelligent contract deployed on the GenLayer testnet:

```python
# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }
from genlayer import *

class AeroSureContract(gl.Contract):
    def __init__(self):
        self.policies = {}
        self.policy_counter = 0
        self.insurance_pool = 1000000

    @gl.public.write
    def purchase_policy(self, flight_number: str, flight_date: str, premium: int):
        self.policy_counter += 1
        policy_id = self.policy_counter
        
        self.policies[policy_id] = {
            "flight_number": flight_number,
            "flight_date": flight_date,
            "premium": premium,
            "payout": premium * 10,
            "status": "ACTIVE",
            "decision": ""
        }
        
        self.insurance_pool += premium
        return policy_id

    @gl.public.write
    def claim_payout(self, policy_id: int):
        if policy_id not in self.policies:
            return "ERROR: Policy does not exist"
        
        policy = self.policies[policy_id]
        if policy["status"] != "ACTIVE":
            return policy["decision"]

        def get_input() -> str:
            return f"Flight Number: {policy['flight_number']}\nDate: {policy['flight_date']}"

        decision = gl.eq_principle.prompt_non_comparative(
            get_input,
            task="Search the web and analyze if this flight was delayed for more than 2 hours or canceled.",
            criteria="The response must be exactly one word: DELAYED or ON_TIME.",
        )

        if "DELAYED" in decision.upper():
            payout = policy["payout"]
            if self.insurance_pool >= payout:
                self.insurance_pool -= payout
                self.policies[policy_id]["status"] = "CLAIMED"
                self.policies[policy_id]["decision"] = f"APPROVED. Payout: {payout}"
                return f"APPROVED. Payout: {payout}"
            else:
                return "ERROR: Insufficient funds in insurance pool."
        else:
            self.policies[policy_id]["status"] = "REJECTED"
            self.policies[policy_id]["decision"] = "REJECTED. Flight was ON TIME."
            return "REJECTED. Flight was ON TIME."

    @gl.public.view
    def get_policy(self, policy_id: int):
        if policy_id in self.policies:
            return self.policies[policy_id]
        return None
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.10+ (for testing the Intelligent Contract locally)

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/salch-cred/aerosure-genlayer.git
   cd aerosure-genlayer/aerosure-app
   ```

2. **Install Dependencies**
   *Note: We use `--legacy-peer-deps` to resolve strict Wagmi peer dependencies.*
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root of `aerosure-app`:
   ```env
   VITE_PRIVY_APP_ID=your_privy_app_id_here
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

---

## 📜 Contract Testing (Local Simulator)

To test the Python Intelligent Contract logic locally:

```bash
cd contracts
python test_contract.py
```
This script runs a simulated End-to-End flow, purchasing a policy and triggering a mock LLM consensus to adjudicate a "delayed" flight vs an "on-time" flight.

---

## 🌐 Deployment

The frontend is fully optimized for Vercel deployment. The repository includes an `.npmrc` file configured to handle peer dependencies automatically during Vercel's build step.

Live Deployment: [https://aerosure-app.vercel.app](https://aerosure-app.vercel.app)

---

## 📄 License

This project is open-source and available under the MIT License.
