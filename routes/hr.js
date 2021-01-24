const express = require('express');
const { body } = require('express-validator/check');
const Employee = require('../models/employee');
const hrController = require('../controllers/hr');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
const mongoose=require('mongoose')
const HrManager=mongoose.model("HrManager")
router.post(
  '/:hrId/add-employee',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return Employee.findOne({ email: value }).then(Employee => {
          if (Employee) {
            return Promise.reject('E-Mail address already exists!');
          }
        });
      })
      .normalizeEmail(),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Minimum length should be 5.')
  ],
  hrController.postAddEmployee
);
router.post('/addhr',(req,res)=>{
const {name,email,password}=req.body;
console.log(name)
/*const HrManager=new HrManager({name,email,password})
HrManager.save()
.then((user)=>{res.json({message:"hr added"})})
.catch(err=>{console.log(err)})*/
res.send("success")
})
router.post('/login', hrController.login);
router.get('/:hrId/leave-reqs',  hrController.getLeaveReq);
router.get('/:hrId/loan-reqs',  hrController.getLoanReq);
router.get('/:hrId/bonus-reqs',  hrController.getLoanReq);

router.get('/:hrId/employees',  hrController.getEmployees);
router.get('/:hrId/employees/:empId',  hrController.getEmployee);
router.put('/:hrId/employees/:empId/edit',  hrController.updateEmployeeDetails);
router.post('/:hrId/employees/:empId/add-allowance',  hrController.addAllowance);
router.post('/:hrId/employees/:empId/add-deduction',  hrController.addDeduction);
router.post('/:hrId/employees/:empId/remove-allowance/:allowanceId',  hrController.removeAllowance);
router.post('/:hrId/employees/:empId/remove-deduction/:deductId',  hrController.removeDeduction);


router.post('/:hrId/leave-reqs/:leaveId/:status', hrController.postLeaveReqStatus);
router.post('/:hrId/loan-reqs/:loanId/:status',  hrController.postLoanReqStatus);
router.post('/:hrId/bonus-reqs/:bonusId/:status',  hrController.postLoanReqStatus);

router.post('/:hrId/open-attendance',  hrController.markAbsent);
router.get('/:hrId/employees/:empId/get-attendance',  hrController.getAttendance);
router.get('/:hrId/get-specific-attendance/:day/:month/:year',  hrController.getSpecificAttendance);

// router.get('/status', isAuth, hrController.getUserStatus);

// router.patch(
//   '/status',
//   isAuth,
//   [ 
//     body('status')
//       .trim()
//       .not()
//       .isEmpty()
//   ],
//   hrController.updateUserStatus
// );

module.exports = router;
