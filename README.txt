# MyLead Postback Project

## Deploy Guide

1. Go to https://render.com → create a free Web Service.
2. Upload this folder as your project.
3. Add environment variable:
   - Name: SHEET_URL
   - Value: (your Sheet.best API URL)
4. Deploy.
5. Copy your Render URL and set it as your Postback URL in MyLead:
   https://yourapp.onrender.com/postback?click_id={click_id}&payout={payout}&status={status}
6. Test conversion in MyLead.

Done! Your Google Sheet will update automatically.
