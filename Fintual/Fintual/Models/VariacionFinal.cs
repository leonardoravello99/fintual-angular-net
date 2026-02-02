namespace Fintual.Models
{
    public class VariacionFinal
    {
        public int Anio {  get; set; }
        public int Mes { get; set; }
        public decimal VariacionInicial { get; set; }

        public decimal VariacionFinals { get; set; }

        public decimal VariacionPorcentaje { get; set; }
    }
}
