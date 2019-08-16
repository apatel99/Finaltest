pragma solidity ^0.5.0;

contract Student
{
    struct student{
        string name;
        uint id;
        address student;
        string course;
        
        
    }
    mapping(address => bool) feespaid;
    mapping(address => uint) feesamount;
    student[]  public studentList;
    
    uint studentcount;
    address registrar;
    event registered(address studentaddr, uint fees);
    
    constructor(address _owner) public
    {
        registrar=_owner;
        studentcount =0;
    }
    modifier onlyRegistrar()
    {
        require(tx.origin==registrar,"only registrar can access it");
        _;
    }

   function Register(string memory _name,uint _id,address _student,string memory _course) public onlyRegistrar
   {
       studentList.push(student(_name,_id,_student,_course));
       studentcount++;
       
   }
   
   function Payfees(address _student)public payable
   {
       require(msg.value==0.0000001 ether,"pay the exact amount");
       
       feesamount[_student]=msg.value;
       
       emit registered(_student,msg.value);
   }
   function checkfees(address _student) private view returns(uint)
   {
       return feesamount[_student];
   }
   function callcheckfees(address _student) public view returns(uint)
   {
       uint amount=feesamount[_student];
       return amount;
       
   }
    
}
