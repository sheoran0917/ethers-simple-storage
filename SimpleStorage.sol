// if you want to select any specific version then use below
// if you want to select any version greater than this use ^0.8.19
// If you want to use solidity version between a range then you can use
// >= 0.8.19 <= 0.9

// this is optionl but we should specify the license

// All the code is complied down to EVM - Ethereum Virtual Machine

//SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract SimpleStorage {
    // boolean, uint, int, address, bytes
    bool hasFavouriteNumber = true;
    // We can specify the bits like uint8, but we dont specify then by deault it will be uint256
    // minimum uint8 and maximum uint256
    // even if we dont intialize it with 5 and keep the variable only then it will set to default value which is 0.
    uint256 public favouriteNumber = 5;
    // even if we do not specify our favouriteNumberInText cast to storage variable.
    string private favouriteNumberInText = "Five";
    int256 favouriteInt = -5;
    address myAddress = 0xf3bE332DC592F04FA10E9Dfe27c809De09f52ED8;
    // maximum bytes32
    bytes32 favouriteBytes = "Cat";

    //People public person = People({favouriteNumber : 2, name:"Praveen"});
    // Array
    People[] public people;
    // Mappings or dictionanry
    mapping(string => uint256) public nameToFaviouriteNumberMapping;
    struct People {
        uint256 favouriteNumber;
        string name;
    }

    function store(uint256 _favouriteNumber) public virtual {
        favouriteNumber = _favouriteNumber;
    }

    // If we declare any identifier as public then it creates a getter function.
    // This getter function is visible outside
    // If we dont specify the visibility, then by default it is internal.
    // public, external, private and internal - are the types of visibility specifiers

    // We can also create our own getter function using below
    function retrieveFavouriteNumber() public view returns (uint256) {
        return favouriteNumber;
    }

    // If we see under deployed contracts store is orange and retrieveFavouriteNumber
    // and favouriteNumber are blue because they are view functions.
    // View and pure fuctions do not spend any gas. View is used for reading the value.
    // We only spend gas if we modify the blockchain state.
    // If a gas function calls a view or pure function - Only then it will cose gas.
    // View are pure function disallow modifications of the state.
    // Pure functions disallow you to read from blockchain state. So why we need it?

    // There could be math that we want to use again and again. Maybe we want to
    // implement a specific algorithem that we want to implment that doesn't actually need
    // to read any state

    function add() public pure returns (uint256) {
        return (1 + 1);
    }

    /* There are six places in Solidity where we can store data(data locations). Stack, Memory, CallData, Storage,
    Code, Logs. Memory, Calldata and Storage are very important. 
    Storing data in solidity tells where the exist (temporarily or permanent)and it can be modified or not.
    So in below function this _name variable only exists temporarily during the transction this add person is called. 
    Storage varaible exist even outside the function execution. 

    Calldata and memory both are temporary variable. Difference is that calldata variable cannot be modified where as
    memory variable can be modified.
    Storage is a permanent variable that can be modified. 

    If you see that we used memory type for string but not for uint256. Reason is we need to define the data locations
    for struct, array or mapping types. String are actullt an array of bytes therefore we need need to specify the data
    locations.
    For uint256, Solidity already know where are you in 256 going to be.
    */

    function addPerson(string memory _name, uint256 _favouriteNumber) public {
        //People memory newPerson1 = People({favouriteNumber: _favouriteNumber, name: _name});
        // People memory newPerson = People(_favouriteNumber,_name);
        people.push(People(_favouriteNumber, _name));
        //people.push(People(_favouriteNumber,_name));
        //Add to mappings
        nameToFaviouriteNumberMapping[_name] = _favouriteNumber;
    }
}
