const INVALID_FORMAT = 'Invalid format'
const INVALID_PROTOCOL = 'Invalid protocol'
const MISSING_ADDRESS = 'Missing recipient address'

const parseQRCode = data => {
    let parsedData;

    try{
        parsedData = new URL(data);
    } catch(err) {
        throw INVALID_FORMAT;
    }

    const { protocol, pathname, searchParams } = parsedData;

    if(protocol !== 'neo:') throw INVALID_PROTOCOL;
    if(!pathname) throw MISSING_ADDRESS;

    return {
        address: pathname,
        asset: searchParams.get("asset"),
        amount: searchParams.get("amount"),
        reference: searchParams.get("description"),
    }
};

export default parseQRCode;