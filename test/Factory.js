const Factory = require('Embark/contracts/Factory');
let accounts;
let address

config({
    //deployment: {
    //  accounts: [
    //    // you can configure custom accounts with a custom balance
    //    // see https://embark.status.im/docs/contracts_testing.html#Configuring-accounts
    //  ]
    //},
    contracts: {
        Factory: {
            args: []
         }
    }
  }, (_err, web3_accounts) => {
    accounts = web3_accounts
  });

  contract("Factory",function(){
    this.timeout(0);
    it("Factory was deployed", async function () {
      address =  Factory.options.address
        console.log("The adress  of factory is ",address)
        assert.ok(address)
      });
    it("check deployStudent", async function () {
        let reciept= await Factory.methods.deployStudent(accounts[0]).send()
        
        assert.ok(reciept)
       
      });
    it("check getstudentById", async function () {
        let addr= await Factory.methods.getstudentById(1).call()
        
        assert.ok(addr)
        
       
      });
    
      
  })