import logging
import time
import os
import sys
from datetime import datetime

# Add current directory to path so sibling imports work correctly
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import all agents
import harvester
import deep_scraper
import pdf_extractor
import compliance_screener
import strategic_analyst
import match_engine
import delta_detector

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler("pipeline_execution.log"),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger("pipeline_orchestrator")

def run_full_pipeline():
    """
    Main entry point to run all agents in the correct sequence.
    """
    start_time = datetime.now()
    logger.info(f"===== STARTING FULL BIDIQ PIPELINE AT {start_time} =====")
    
    pipeline_steps = [
        ("Agent 1: Harvester (Discovery)", harvester.harvest),
        ("Agent 3: Deep Scraper (Details)", deep_scraper.run),
        ("Agent 4: PDF Extractor (Documents)", pdf_extractor.run),
        ("Agent 5: Compliance Screener (AI)", compliance_screener.run),
        ("Agent 6: Strategic Analyst (AI)", strategic_analyst.run),
        ("Agent 7: Match Engine (Scoring)", match_engine.run),
        ("Agent 2: Delta Detector (Digests)", delta_detector.run),
    ]
    
    results = []
    
    for name, func in pipeline_steps:
        try:
            logger.info(f">>> Executing {name}...")
            step_start = time.time()
            func()
            duration = time.time() - step_start
            logger.info(f"<<< {name} completed in {duration:.2f} seconds.")
            results.append(f"{name}: SUCCESS ({duration:.2f}s)")
        except Exception as e:
            logger.error(f"!!! Error in {name}: {e}")
            results.append(f"{name}: FAILED - {str(e)}")
            
    end_time = datetime.now()
    total_duration = end_time - start_time
    
    logger.info(f"===== PIPELINE COMPLETE AT {end_time} =====")
    logger.info(f"Total Duration: {total_duration}")
    
    # Summary for log
    print("\n" + "="*40)
    print("PIPELINE SUMMARY")
    print("="*40)
    for res in results:
        print(res)
    print("="*40)

if __name__ == "__main__":
    run_full_pipeline()
