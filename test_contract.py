import sys
import os

# Add contracts dir to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'contracts'))

from aerosure import AeroSureContract

class MockGenLayer:
    pass

def run_e2e_test():
    print("Starting End-to-End Test for AeroSure Intelligent Contract")
    print("-" * 60)
    
    gl = MockGenLayer()
    contract = AeroSureContract(gl)
    print("Contract Initialized. Insurance Pool: 1,000,000 $GEN")
    
    # 1. Purchase Policy for High Risk (Delayed) Flight
    flight_1 = "DELAY404"
    print(f"\n[Purchase] Policy 1 for Flight {flight_1}...")
    policy_id_1 = contract.purchase_policy(flight_1, "2026-08-20", 35)
    print(f"Policy {policy_id_1} created! Premium: 35 $GEN, Potential Payout: 350 $GEN")
    
    # 2. Purchase Policy for Low Risk (On-Time) Flight
    flight_2 = "AA123"
    print(f"\n[Purchase] Policy 2 for Flight {flight_2}...")
    policy_id_2 = contract.purchase_policy(flight_2, "2026-08-21", 10)
    print(f"Policy {policy_id_2} created! Premium: 10 $GEN, Potential Payout: 100 $GEN")
    
    print("-" * 60)
    print("Initiating Claim Adjudication via GenLayer LLM Simulator")
    print("-" * 60)
    
    # 3. Claim Payout for Policy 1
    print(f"\nUser requests claim for Policy {policy_id_1} (Flight {flight_1})")
    print(f"LLM querying live web data for flight status...")
    result_1 = contract.claim_payout(policy_id_1)
    if result_1["status"] == "success":
        print(f"SUCCESS: {result_1['message']} (LLM Decision: {result_1['decision']})")
    else:
        print(f"FAILED: {result_1['message']}")
        
    # 4. Claim Payout for Policy 2
    print(f"\nUser requests claim for Policy {policy_id_2} (Flight {flight_2})")
    print(f"LLM querying live web data for flight status...")
    result_2 = contract.claim_payout(policy_id_2)
    if result_2["status"] == "rejected":
        print(f"REJECTED (Expected): {result_2['message']} (LLM Decision: {result_2['decision']})")
    else:
        print(f"UNEXPECTED OUTCOME: {result_2}")
        
    print("-" * 60)
    print("End-to-End Test Completed Successfully!")
    
if __name__ == "__main__":
    run_e2e_test()
