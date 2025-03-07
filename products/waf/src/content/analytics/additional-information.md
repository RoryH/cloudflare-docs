---
order: 10
pcx-content-type: reference
---

# Additional information

## Validation checks

Cloudflare performs a validation check for every request. The Validation component executes prior to all other Firewall products like Custom Rules or Managed Rulesets. The validation check blocks malformed requests like Shellshock attacks and requests with certain attack patterns in their HTTP headers before any allowlist logic occurs. Actions performed by the Validation component appear in the **Activity log** associated with the `Validation` service and without a rule ID. Firewall events downloaded from the API show source as `Validation` and action as `drop` when this behavior occurs.

The following example shows a request blocked by the Validation component due to a malformed `User-Agent` HTTP request header:

![Event from a validation check](../images/analytics-validation.png)

In the downloaded JSON file for the event, the `ruleId` value indicates the detected issue — in this case, it was a Shellshock attack.

```json
---
highlight: [3]
---
{
  "action": "drop",
  "ruleId": "sanity-shellshock",
  "source": "sanitycheck",
  "userAgent": "() { :;}; printf \\\\\"detection[%s]string\\\\\" \\\\\"TjcLLwVzBtLzvbN\\\\",
  //...
}
```

<Aside type="warning">

Currently, you cannot disable validation checks. They run early in Cloudflare's infrastructure before the configuration for domains has been loaded.

</Aside>
