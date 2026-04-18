import pypdf
import sys

def extract_pdf():
    try:
        reader = pypdf.PdfReader('c:\\Users\\dell\\Desktop\\StrongerBuilt_Website_Redesign_PRD.pdf')
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        with open('C:\\Users\\dell\\.gemini\\antigravity\\scratch\\prd.txt', 'w', encoding='utf-8') as f:
            f.write(text)
        print("Success")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    extract_pdf()
