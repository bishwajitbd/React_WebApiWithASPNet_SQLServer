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
    public class DepartmentController : ApiController
    {
        public HttpResponseMessage Get()
        {
            DataTable dt = new DataTable();

            string query = @"SELECT DepartmentID, DepartmentName FROM Departments";

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["EmployeesAppDB"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(dt);
            }
            return Request.CreateResponse(HttpStatusCode.OK, dt);
        }
        public string Post(Department dep)
        {
            try
            {
                DataTable dt = new DataTable();

                string query = @"
                                INSERT INTO Departments VALUES ('" + dep.DepartmentName + @"')
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
        public string Put(Department dep)
        {
            try
            {
                DataTable dt = new DataTable();

                string query = @"
                                UPDATE Departments SET DepartmentName='" + dep.DepartmentName + @"'
                                WHERE DepartmentID='"+ dep.DepartmentID+ @"'
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
                                DELETE FROM Departments WHERE DepartmentID='" + id + @"'
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
