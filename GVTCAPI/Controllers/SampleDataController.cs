using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.Serialization.Json;
using System.Threading.Tasks;
using GVTCAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace GVTCAPI.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        /// <summary>
        /// global static variables for controller
        /// </summary>
        private static readonly HttpClient client = new HttpClient();        
        private const string githubURL = "https://api.github.com/users/Paxman23l/starred";
        private const string userAgent = "GvtcAPI";
        private const string mediaType = "application/vnd.github.v3+json";

        /// <summary>
        /// Filter data from Github and return json
        /// </summary>
        /// <param name="searchString"></param>
        /// <returns></returns>
        [HttpGet("[action]")]
        public async Task<JsonResult> GetGitHubInfoAsync(string searchString)
        {
            var result = await ProcessRepos();
            if (!String.IsNullOrWhiteSpace(searchString))
            {
                searchString = searchString.ToLower().Replace(" ", "");
                result = result.Where(x => x.Name.ToLower().Replace(" ", "").Contains(searchString) || x.Description.ToLower().Replace(" ", "").Contains(searchString));
            }
            return new JsonResult(result);
        }

        /// <summary>
        /// Gets data from GitHub
        /// </summary>
        /// <returns></returns>
        private static async Task<IEnumerable<Repository>> ProcessRepos()
        {
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(mediaType));
            client.DefaultRequestHeaders.Add("User-Agent", userAgent);
                        
            var serializer = new DataContractJsonSerializer(typeof(List<Repository>));
            
            var streamTask = client.GetStreamAsync(githubURL);
            var repositories = serializer.ReadObject(await streamTask) as IEnumerable<Repository>;
            repositories = repositories.OrderBy(x => x.Name);
            return repositories;
        }        
        
        public async Task<JsonResult> CheckRateLimit()
        {
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue(mediaType));
            client.DefaultRequestHeaders.Add("User-Agent", userAgent);

            return new JsonResult( await client.GetStreamAsync("https://www.github.com/rate_limit"));
        }
    }
}
