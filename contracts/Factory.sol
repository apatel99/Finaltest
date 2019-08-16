pragma solidity ^0.5.0;
import "./Student.sol";
contract Factory {
    
    uint public studentId;
    
    mapping(uint =>Student) studentList;
    
    event NewStudent(uint id );
    
    function deployStudent(address _owner) public {
        studentId++;
       Student s= new Student(_owner);
       studentList[studentId] = s;
        emit NewStudent(studentId);
    }
    
    function getstudentById(uint _id) public view returns (Student) {
       return studentList[_id];
    }
}
