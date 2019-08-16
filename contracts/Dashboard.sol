pragma solidity ^0.5.0;
import "./Factory.sol";


contract Dashboard
{
    Factory database;
    uint id;
    mapping(string=>bool)feesstatus;
      
      constructor(address _database) public {
        database = Factory(_database);
        id=0;
    }
    
     function NewStudent(address _owner) public  {
         id++;
        database.deployStudent(_owner);
    }
    
    function getid() public view returns(uint)
    {
        return id;
    }
    function getRegisterbyId(uint _id,string memory _name,uint studentid,address _student,string memory _cours) public  {
        Student s= Student(database.getstudentById(_id));
      s.Register(_name,studentid,_student,_cours);
      feesstatus[_name]=false;
       
       
    }
    function getPayFeesbyId(uint _id,address _student,string memory _name) public payable  returns(uint) {
        Student s= Student(database.getstudentById(_id));
      s.Payfees.value(msg.value)(_student);
       feesstatus[_name]=true;
       
    }
    function getcheckFeesbyId(uint _id,address _student) public payable  returns(uint) {
        Student s= Student(database.getstudentById(_id));
      s.callcheckfees(_student);
      
      
      
       
       
    }
    function getstatus(string memory name) public view returns(bool)
    {
        return(feesstatus[name]);
    }
}