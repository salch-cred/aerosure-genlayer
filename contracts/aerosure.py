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
    def claim_payout(self, policy_id: int, evidence_url: str):
        if policy_id not in self.policies:
            return "ERROR: Policy does not exist"
        
        policy = self.policies[policy_id]
        if policy["status"] != "ACTIVE":
            return policy["decision"]

        # This inner function captures outer variables to format the prompt input
        def get_input() -> str:
            return f"Flight Number: {policy['flight_number']}\nDate: {policy['flight_date']}\nSource Evidence URL: {evidence_url}"

        # GenLayer network consensus for LLM non-determinism
        decision = gl.eq_principle.prompt_non_comparative(
            get_input,
            task="Navigate to the provided Source Evidence URL to verify the flight status. Determine if this flight was delayed for more than 2 hours or canceled based on the evidence.",
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
