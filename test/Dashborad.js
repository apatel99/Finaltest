const Dashboard = require('Embark/contracts/Dashboard');


let accounts;


config({
    //deployment: {
    //  accounts: [
    //    // you can configure custom accounts with a custom balance
    //    // see https://embark.status.im/docs/contracts_testing.html#Configuring-accounts
    //  ]
    //},
    contracts: {
        "Dashboard": {
            
            args:['$Factory'] 
          },
          "Factory": {
            args: []
         }

    }
  }, (_err, web3_accounts) => {
    accounts = web3_accounts
  });

  contract("Dashboard",function(){
    this.timeout(0)
    it("Dashboard was deployed", async function () {
      let address = await Dashboard.options.address
      console.log("The address of the dashboard is",address)
    });
    it("check newStudent", async function () {
        let reciept = await Dashboard.methods.NewStudent(accounts[0]).send()
       
        assert.ok(reciept)
      });
      it("check getid", async function () {
        let reciept = await Dashboard.methods.getid().call()
       
        assert.equal(reciept,1)
      });
      it("check getRegisterbyId", async function () {
        let reciept = await Dashboard.methods.getRegisterbyId(1,"aaa",101,"0x7beb2b34f29430f58f50e5bc414d4fe9858f559b","maths").send()
       
        assert.ok(reciept)
      });
      it("check getPayFeesbyId", async function () {
        let reciept = await Dashboard.methods.getPayFeesbyId(1,"0x7beb2b34f29430f58f50e5bc414d4fe9858f559b","aaa").send({value:100000000000})
       
        assert.ok(reciept)
      });
      it("check getcheckFeesbyId", async function () {
        let reciept = await Dashboard.methods.getcheckFeesbyId(1,"0x7beb2b34f29430f58f50e5bc414d4fe9858f559b",).send({value:100000000000})
      
       
        assert.ok(reciept)
      });
      it("check getstatus", async function () {
        let reciept = await Dashboard.methods.getstatus("aaa").call()
        console.log("The reciept is",reciept)
       
        assert.equal(reciept,true)
      });




    
})