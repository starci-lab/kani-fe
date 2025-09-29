import superjson from "superjson"
import BN from "bn.js"

superjson.registerCustom({
    isApplicable: (value) => BN.isBN(value),
    // Convert BN to string for serialization
    serialize: (bn) => bn.toString(10),
    // Convert string back to BN on deserialization
    deserialize: (value) => new BN(value),
}, "bn.js" )

export default superjson