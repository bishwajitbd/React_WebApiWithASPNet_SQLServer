using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using WebApi.Models;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;

namespace WebApi.Controllers
{
    public class EmployeesController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable dt = new DataTable();

            string query = @"SELECT EmpID, EmployeeName, Department, MailID, CONVERT(VARCHAR(10), DOJ,120) AS DOJ FROM Employees;";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeesAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(dt);
            }
            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }

        
        public string Post(Employees emp)
        {
            try
            {
                DataTable dt = new DataTable();

                string query = @"
                                INSERT INTO Employees 
                                (EmployeeName, Department, MailID, DOJ)
                                VALUES 
                                (
                                '" + emp.EmployeeName + @"'
                                ,'" + emp.Department + @"'
                                ,'" + emp.MailID + @"'
                                ,'" + emp.DOJ + @"'
                                )
                                ";


                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeesAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(dt);
                }
                return "Added Sucessfully";
            }
            catch (Exception)
            {
                return "Failed to Add";
            }
        }

        public string Put(Employees emp)
        {
            try
            {
                DataTable dt = new DataTable();

                string query = @"
                                UPDATE Employees SET EmployeeName='" + emp.EmployeeName + @"' 
                                    ,Department='" + emp.Department + @"'
                                    ,MailID='" + emp.MailID + @"'
                                    ,DOJ='" + emp.DOJ + @"'
                                    WHERE EmpID='" + emp.EmpID + @"'
                                    ";


                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeesAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(dt);
                }
                return "Updated Sucessfully";
            }
            catch (Exception)
            {
                return "Failed to updated";
            }
        }

        public string Delete(int id)
        {
            try
            {
                DataTable dt = new DataTable();

                string query = @"
                                DELETE FROM Employees WHERE EmpId='" + id + @"'
                                ";


                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeesAppDB"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(dt);
                }
                return "Deleted Sucessfully";
            }
            catch (Exception)
            {
                return "Failed to delete";
            }
        }
    }
}
