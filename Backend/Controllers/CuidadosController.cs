using Backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace ZooManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CuidadosController : ControllerBase
    {
        private readonly AppDataContext _context;

        public CuidadosController(AppDataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cuidado>>> GetCuidados()
        {
            return await _context.Cuidados.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Cuidado>> PostCuidado(Cuidado cuidado)
        {
            _context.Cuidados.Add(cuidado);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCuidados", new { id = cuidado.Id }, cuidado);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCuidado(int id)
        {
            var cuidado = await _context.Cuidados.FindAsync(id);
            if (cuidado == null)
            {
                return NotFound();
            }

            _context.Cuidados.Remove(cuidado);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}