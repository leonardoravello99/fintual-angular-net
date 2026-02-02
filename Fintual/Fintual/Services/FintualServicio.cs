using Fintual.Models;
using System.Text.Json;

namespace Fintual.Services
{
    public class FintualServicio
    {
        private readonly HttpClient _httpClient;

        public FintualServicio(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.DefaultRequestHeaders.Add(
        "User-Agent",
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64)");
        
        }
         
        public async Task<List<FondoDia>> GetHistorialPrecio (
            
            int assetId,DateTime from, DateTime to)
        {

            var url = $"https://fintual.cl/api/real_assets/{assetId}/days" +
              $"?from_date={from:yyyy-MM-dd}&to_date={to:yyyy-MM-dd}";

            var response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);

            if (!doc.RootElement.TryGetProperty("data", out var dataArray))
                throw new Exception("Respuesta inesperada de la API: falta 'data'");

            var result = new List<FondoDia>();

            foreach (var item in dataArray.EnumerateArray())
            {
                var attributes = item.GetProperty("attributes");

                result.Add(new FondoDia
                {
                    Date = DateTime.Parse(attributes.GetProperty("date").GetString()!),
                    Price = attributes.GetProperty("price").GetDecimal()
                });
            }

            return result;
            

        }



    }
}
