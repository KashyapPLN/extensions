async function fetchSummary() {
  
    const apiUrl = 'https://hipsum.co/api/?type=hipster-centric&paras=1';
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        return { text: data[0] };
    } catch (error) {
        console.error('Error fetching random text:', error);
        return { text: 'Error fetching random text. Please try again later.' };
    }
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Background Script: Received message:', message);

    if (message.type === 'REQUEST_TEXT') {
         fetchSummary().then((apiResponse) => {
            sendResponse(apiResponse);
        });
        return true;
    }
});
