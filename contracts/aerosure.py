import json

class AeroSureContract:
    def __init__(self, gl):
        self.gl = gl
        # Format: { policy_id: { "buyer": address, "flight_number": str, "date": str, "premium": int, "payout": int, "status": "active" | "claimed" } }
        self.policies = {}
        self.policy_counter = 0
        self.insurance_pool = 1000000 # Mock pool

    def purchase_policy(self, flight_number: str, flight_date: str, premium: int):
        # User pays premium
        policy_id = self.policy_counter
        self.policy_counter += 1
        
        self.policies[policy_id] = {
            "buyer": "0xUserAddress", # In a real contract, use self.gl.msg.sender
            "flight_number": flight_number,
            "date": flight_date,
            "premium": premium,
            "payout": premium * 10, # 10x payout
            "status": "active"
        }
        
        self.insurance_pool += premium
        return policy_id
        
    def claim_payout(self, policy_id: int):
        if policy_id not in self.policies:
            return {"status": "error", "message": "Policy not found"}
            
        policy = self.policies[policy_id]
        
        if policy["status"] != "active":
            return {"status": "error", "message": "Policy already claimed or expired"}
            
        # Use GenLayer LLM to check flight status
        flight = policy["flight_number"]
        date = policy["date"]
        
        prompt = f"""
        Search the web for the flight status of {flight} on {date}.
        Determine if the flight was significantly delayed (more than 2 hours) or canceled.
        Respond with exactly ONE word:
        - "DELAYED" if it was delayed > 2 hours or canceled.
        - "ON_TIME" if it departed on time or was delayed less than 2 hours.
        - "UNKNOWN" if you cannot reliably determine the status.
        """
        
        # In a real GenLayer contract, we'd use self.gl.exec_prompt
        # For hackathon simulation, we'll mock the response based on the flight number
        # to allow deterministic testing from the frontend.
        
        if "DELAY" in flight.upper():
            decision = "DELAYED"
        elif "CANCEL" in flight.upper():
            decision = "DELAYED"
        else:
            decision = "ON_TIME"
            
        if decision == "DELAYED":
            # Process payout
            payout_amount = policy["payout"]
            if self.insurance_pool >= payout_amount:
                self.insurance_pool -= payout_amount
                policy["status"] = "claimed"
                return {"status": "success", "message": f"Claim approved! {payout_amount} paid out.", "decision": decision}
            else:
                return {"status": "error", "message": "Insufficient funds in insurance pool."}
        else:
            return {"status": "rejected", "message": "Claim rejected: Flight was not delayed or canceled.", "decision": decision}
            
    def get_policy(self, policy_id: int):
        return self.policies.get(policy_id)
        
    def get_all_policies(self):
        return self.policies
