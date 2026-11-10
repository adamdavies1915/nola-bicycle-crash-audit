const endpoint='https://wabi-us-gov-virginia-api.analysis.usgovcloudapi.net/public/reports/querydata?synchronous=true';
const id=document.body.dataset.id;
const props=['Id','CrashDate','Latitude','Longitude','FirstHarmfulEvent','CrashSeverity'];
async function loadRecord(){
 const status=document.getElementById('status'), result=document.getElementById('record'),raw=document.getElementById('raw');
 status.textContent='Fetching this crash from the public city dashboard…';status.dataset.state='loading';result.textContent='';raw.textContent='';
 const query={Version:2,From:[{Name:'v',Entity:'VwCrash',Type:0}],Select:props.map(p=>({Column:{Expression:{SourceRef:{Source:'v'}},Property:p},Name:'VwCrash.'+p})),Where:[{Condition:{Comparison:{ComparisonKind:0,Left:{Column:{Expression:{SourceRef:{Source:'v'}},Property:'Id'}},Right:{Literal:{Value:"'"+id+"'"}}}}}]};
 const body={version:'1.0.0',queries:[{Query:{Commands:[{SemanticQueryDataShapeCommand:{Query:query,Binding:{Primary:{Groupings:[{Projections:props.map((_,i)=>i)}]},DataReduction:{DataVolume:3,Primary:{Window:{Count:10}}},Version:1},ExecutionMetricsKind:1}}]},CacheKey:'',QueryId:'',ApplicationContext:{DatasetId:'b592cc6a-3a2b-4c10-83c7-407a85ed774f'}}],cancelQueries:[],modelId:1123171};
 try{
  if(!/^[0-9A-F-]{36}$/i.test(id))throw Error('Invalid record ID');
  const response=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'application/json','X-PowerBI-ResourceKey':'64b5bcc7-9e2c-48cc-8d8a-5893f05fc82f'},body:JSON.stringify(body),signal:AbortSignal.timeout(30000)});
  if(!response.ok)throw Error('HTTP '+response.status);
  const data=await response.json();raw.textContent=JSON.stringify(data,null,2);
  const source=data.results?.[0]?.result?.data,ds=source?.dsr?.DS?.[0],rows=ds?.PH?.[0]?.DM0;
  if(!rows||rows.length!==1)throw Error('Expected one matching record; received '+(rows?.length??'no data'));
  const row=rows[0],schema=row.S,values=row.C||[];let i=0;const record={};
  schema.forEach((s,j)=>{let value=(row['Ø']||0)&(1<<j)?null:values[i++];if(s.DN&&Number.isInteger(value))value=ds.ValueDicts[s.DN][value];record[props[j]]=value;});
  if(record.Id.toUpperCase()!==id.toUpperCase())throw Error('Returned ID does not match requested ID');
  record.CrashDate=record.CrashDate===null?null:new Date(record.CrashDate).toISOString().slice(0,10);
  result.textContent=JSON.stringify(record,null,2);status.dataset.state='loaded';
  status.textContent='Fetched from the live dashboard API at '+new Date().toLocaleString()+'. API response timestamp: '+source.timestamp+'. This reflects the dashboard’s published data and refresh schedule.';
 }catch(e){status.dataset.state='error';status.textContent='Live lookup failed: '+e.message+'. No saved data has been substituted. Use the saved snapshot link below or retry.';}
}
document.getElementById('refresh').onclick=loadRecord;loadRecord();
