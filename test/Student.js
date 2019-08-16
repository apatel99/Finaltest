// /*global contract, config, it, assert*/

const Student = require('Embark/contracts/Student');

let accounts;
// accounts = web3_accounts

// For documentation please see https://embark.status.im/docs/contracts_testing.html
config({
  //deployment: {
  //  accounts: [
  //    // you can configure custom accounts with a custom balance
  //    // see https://embark.status.im/docs/contracts_testing.html#Configuring-accounts
  //  ]
  //},
  contracts: {
    "Student": {
      args: ['$accounts[0]']
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("Student", function () {
  this.timeout(0);

  it("Student was deployed", async function () {
    let address =   Student.options.address
    console.log("The address is",address)
    assert.ok(address)
  });


  it("check register should pass", async function () {
    
     let tx=await Student.methods.Register("aaa",101,"0x7beb2b34f29430f58f50e5bc414d4fe9858f559b","maths").send({from:accounts[0]});
    
    assert.ok(tx)
  });

  it("check register should not pass", async function () {
    try{
      let tx=await Student.methods.Register("aaa",101,"0x7beb2b34f29430f58f50e5bc414d4fe9858f559b","maths").send({from:accounts[1]});
    }
    catch(error)
     {
      let errormessage=error.message;
      assert.ok(errormessage.includes("only registrar can access it"))
     }
   
    
    
    
  });

  it("Payfees function should pass", async function () {
    
    let tx=await Student.methods.Payfees("0x7beb2b34f29430f58f50e5bc414d4fe9858f559b").send({from:accounts[0],value:100000000000});
   
   assert.ok(tx)
 });
 it("pay fees should not pass", async function () {
  try{
    let tx=await Student.methods.Payfees("0x7beb2b34f29430f58f50e5bc414d4fe9858f559b").send({from:accounts[0],value:1000000000000});
  }
  catch(error)
   {
    let errormessage=error.message;
    assert.ok(errormessage.includes("pay the exact amount"))
   }
  });
  it(" Callcheckfees function", async function () {
    
    let tx=await Student.methods.callcheckfees("0x7beb2b34f29430f58f50e5bc414d4fe9858f559b").call()
   assert.equal(tx,100000000000)
 });


  
}
)
