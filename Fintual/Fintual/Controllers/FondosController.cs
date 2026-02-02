using Fintual.Models;
using Microsoft.AspNetCore.Mvc;
using System;

namespace Fintual.Controllers
{
    [ApiController]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]

    public class FondosController : ControllerBase
    {
        private readonly Fintual.Services.FintualServicio _fintualServicio;
        public FondosController(Fintual.Services.FintualServicio fintualServicio)
        {
            _fintualServicio = fintualServicio;
        }
        [HttpGet("variacionfinal")]

        public async Task<IActionResult> GetVariaciones(
            int assetId, 
            DateTime from, DateTime to)
        {
            var precios = await _fintualServicio.GetHistorialPrecio(assetId, from, to);
            var variaciones = precios
                .GroupBy(p => new { p.Date.Year, p.Date.Month })
                .Select(g =>
                {
                    var ordered =g.OrderBy(x => x.Date).ToList();
                    var inicio = ordered.First().Price;
                    var fin = ordered.Last().Price;

                    return new VariacionFinal
                    {
                        Anio = g.Key.Year,
                        Mes = g.Key.Month,
                        VariacionInicial = inicio,
                        VariacionFinals = fin,
                        VariacionPorcentaje = Math.Round ((fin - inicio) / inicio * 100,2) 
                    };
                    
                })
                .OrderBy(v => v.Anio)
                .ThenBy(v => v.Mes)
                .ToList();
            return Ok(variaciones);
        }
}
}

