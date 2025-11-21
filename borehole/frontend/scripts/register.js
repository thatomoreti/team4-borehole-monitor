// scripts/register.js

/**
 * Complete Borehole Registration Script
 * 
 * Features:
 * 1. Connects to MetaMask
 * 2. Interacts with BoreholeMonitor contract
 * 3. Sends registerBorehole transaction
 * 4. Waits for transaction confirmation
 * 5. Shows Borehole ID from BoreholeRegistered event
 * 6. Handles errors
 */

document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const messageDiv = document.getElementById("message");

    // === Contract Setup ===
    const CONTRACT_ADDRESS = "0x10Ba41DeE4dD0520c194Ca4bb4B2dCa51a700D0C"; // Replace with your deployed contract address
   [
	{
		"inputs": [],
		"name": "AlreadyExists",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "BoreholeInactive",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "InvalidValue",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotOwner",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "NotRegistered",
		"type": "error"
	},
	{
		"inputs": [],
		"name": "TooMany",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "boreholeId",
				"type": "bytes32"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "BoreholeRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "boreholeId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			}
		],
		"name": "BoreholeStatusToggled",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "boreholeId",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint40",
				"name": "timestamp",
				"type": "uint40"
			},
			{
				"indexed": false,
				"internalType": "uint24",
				"name": "waterLevel",
				"type": "uint24"
			},
			{
				"indexed": false,
				"internalType": "uint16",
				"name": "pressure",
				"type": "uint16"
			}
		],
		"name": "ReadingAdded",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_boreholeId",
				"type": "bytes32"
			},
			{
				"internalType": "uint24",
				"name": "_waterLevel",
				"type": "uint24"
			},
			{
				"internalType": "uint16",
				"name": "_pressure",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "_flowRate",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "_powerUsage",
				"type": "uint16"
			},
			{
				"internalType": "uint8",
				"name": "_efficiency",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "_pumpStatus",
				"type": "bool"
			}
		],
		"name": "addReading",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_boreholeId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_packed",
				"type": "uint256"
			}
		],
		"name": "addReadingPacked",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_boreholeId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256[]",
				"name": "_packedReadings",
				"type": "uint256[]"
			}
		],
		"name": "addReadingsBatchPacked",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_location",
				"type": "string"
			}
		],
		"name": "registerBorehole",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_boreholeId",
				"type": "bytes32"
			}
		],
		"name": "toggleBoreholeStatus",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "boreholeReadings",
		"outputs": [
			{
				"internalType": "uint40",
				"name": "timestamp",
				"type": "uint40"
			},
			{
				"internalType": "uint24",
				"name": "waterLevel",
				"type": "uint24"
			},
			{
				"internalType": "uint16",
				"name": "pressure",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "flowRate",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "powerUsage",
				"type": "uint16"
			},
			{
				"internalType": "uint8",
				"name": "efficiency",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "pumpStatus",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"name": "boreholes",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "id",
				"type": "bytes32"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint40",
				"name": "createdAt",
				"type": "uint40"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "uint32",
				"name": "readingCount",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_decimals",
				"type": "uint256"
			}
		],
		"name": "convertToReadable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_boreholeId",
				"type": "bytes32"
			}
		],
		"name": "getBoreholeInfo",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "location",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint40",
				"name": "createdAt",
				"type": "uint40"
			},
			{
				"internalType": "bool",
				"name": "isActive",
				"type": "bool"
			},
			{
				"internalType": "uint32",
				"name": "readingCount",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_boreholeId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_count",
				"type": "uint256"
			}
		],
		"name": "getLatestReadings",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint40",
						"name": "timestamp",
						"type": "uint40"
					},
					{
						"internalType": "uint24",
						"name": "waterLevel",
						"type": "uint24"
					},
					{
						"internalType": "uint16",
						"name": "pressure",
						"type": "uint16"
					},
					{
						"internalType": "uint16",
						"name": "flowRate",
						"type": "uint16"
					},
					{
						"internalType": "uint16",
						"name": "powerUsage",
						"type": "uint16"
					},
					{
						"internalType": "uint8",
						"name": "efficiency",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "pumpStatus",
						"type": "bool"
					}
				],
				"internalType": "struct BoreholeMonitor.Reading[]",
				"name": "out",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_boreholeId",
				"type": "bytes32"
			},
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getReading",
		"outputs": [
			{
				"internalType": "uint40",
				"name": "timestamp",
				"type": "uint40"
			},
			{
				"internalType": "uint24",
				"name": "waterLevel",
				"type": "uint24"
			},
			{
				"internalType": "uint16",
				"name": "pressure",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "flowRate",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "powerUsage",
				"type": "uint16"
			},
			{
				"internalType": "uint8",
				"name": "efficiency",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "pumpStatus",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "_boreholeId",
				"type": "bytes32"
			}
		],
		"name": "getReadingCount",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "MAX_BATCH",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint24",
				"name": "_waterLevel",
				"type": "uint24"
			},
			{
				"internalType": "uint16",
				"name": "_pressure",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "_flowRate",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "_powerUsage",
				"type": "uint16"
			},
			{
				"internalType": "uint8",
				"name": "_efficiency",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "_pumpStatus",
				"type": "bool"
			}
		],
		"name": "packData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint40",
				"name": "_timestamp",
				"type": "uint40"
			},
			{
				"internalType": "uint24",
				"name": "_waterLevel",
				"type": "uint24"
			},
			{
				"internalType": "uint16",
				"name": "_pressure",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "_flowRate",
				"type": "uint16"
			},
			{
				"internalType": "uint16",
				"name": "_powerUsage",
				"type": "uint16"
			},
			{
				"internalType": "uint8",
				"name": "_efficiency",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "_pumpStatus",
				"type": "bool"
			}
		],
		"name": "packDataWithTimestamp",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_packed",
				"type": "uint256"
			}
		],
		"name": "unpackData",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint40",
						"name": "timestamp",
						"type": "uint40"
					},
					{
						"internalType": "uint24",
						"name": "waterLevel",
						"type": "uint24"
					},
					{
						"internalType": "uint16",
						"name": "pressure",
						"type": "uint16"
					},
					{
						"internalType": "uint16",
						"name": "flowRate",
						"type": "uint16"
					},
					{
						"internalType": "uint16",
						"name": "powerUsage",
						"type": "uint16"
					},
					{
						"internalType": "uint8",
						"name": "efficiency",
						"type": "uint8"
					},
					{
						"internalType": "bool",
						"name": "pumpStatus",
						"type": "bool"
					}
				],
				"internalType": "struct BoreholeMonitor.Reading",
				"name": "r",
				"type": "tuple"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
];

    let contract;

    // === Connect to MetaMask and Contract ===
    async function connectContract() {
        if (!window.ethereum) {
            alert("Please install MetaMask!");
            return null;
        }

        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
            return contract;
        } catch (err) {
            console.error("MetaMask connection error:", err);
            messageDiv.innerText = "Error connecting to MetaMask.";
            return null;
        }
    }

    // === Handle Borehole Registration ===
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("boreholeName").value.trim();
        const location = document.getElementById("boreholeLocation").value.trim();

        if (!name || !location) {
            messageDiv.innerText = "Please fill all fields!";
            return;
        }

        const contract = await connectContract();
        if (!contract) return;

        try {
            // Send transaction
            const tx = await contract.registerBorehole(name, location);
            messageDiv.innerText = "Transaction submitted! Waiting for confirmation...";

            // Wait for transaction to be mined
            const receipt = await tx.wait();

            // Look for BoreholeRegistered event
            const event = receipt.events.find(e => e.event === "BoreholeRegistered");
            if (event) {
                const boreholeId = event.args.boreholeId;
                messageDiv.innerHTML = `<span style="color:green;">Borehole registered successfully!<br>ID: ${boreholeId}</span>`;
            } else {
                messageDiv.innerHTML = `<span style="color:orange;">Borehole registered, but event not found!</span>`;
            }

            // Reset form
            registerForm.reset();

        } catch (err) {
            console.error("Transaction error:", err);
            let errMsg = err.reason || err.message || "Unknown error";
            messageDiv.innerHTML = `<span style="color:red;">Error: ${errMsg}</span>`;
        }
    });
});
