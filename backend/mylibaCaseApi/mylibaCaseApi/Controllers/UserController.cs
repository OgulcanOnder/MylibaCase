using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using mylibaCaseApi.Entities;
using mylibaCaseApi.Services;

namespace mylibaCaseApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public ActionResult<List<User>> Get() => _userService.Get();

        [HttpGet("{id}")]
        public ActionResult<User> Get(string id)
        {
            var user = _userService.Get(id);
            if (user == null) return NotFound();
            return user;
        }

        [HttpPost]
        public ActionResult<User> Create(User user)
        {
            // try catch Yapısı Sayesinde Hata Anında Exception Fırlatır
            try
            {
                _userService.Create(user);
            return CreatedAtAction(nameof(Get), new { id = user.Id }, user);

            }
            catch(ApplicationException ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, User updateUser)
        {
            try
            {
                var user = _userService.Get(id);
                if (user == null)
                {
                    return NotFound();
                }

                updateUser.Id = id;
                _userService.Update(id, updateUser);
                return NoContent();
            }
            catch (ApplicationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(string id)
        {
            if (!ObjectId.TryParse(id, out _))
                return BadRequest("Geçersiz ID Formatı. ID, 24 Karakterli ObjectId Olmalıdır!");

            var user = _userService.Get(id);
            if (user == null) return NotFound();              
            _userService.Remove(id);            
            return NoContent();
        }
    }
}
