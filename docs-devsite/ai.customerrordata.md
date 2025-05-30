Project: /docs/reference/js/_project.yaml
Book: /docs/reference/_book.yaml
page_type: reference

{% comment %}
DO NOT EDIT THIS FILE!
This is generated by the JS SDK team, and any local changes will be
overwritten. Changes should be made in the source code at
https://github.com/firebase/firebase-js-sdk
{% endcomment %}

# CustomErrorData interface
Details object that contains data originating from a bad HTTP response.

<b>Signature:</b>

```typescript
export interface CustomErrorData 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [errorDetails](./ai.customerrordata.md#customerrordataerrordetails) | [ErrorDetails](./ai.errordetails.md#errordetails_interface)<!-- -->\[\] | Optional additional details about the error. |
|  [response](./ai.customerrordata.md#customerrordataresponse) | [GenerateContentResponse](./ai.generatecontentresponse.md#generatecontentresponse_interface) | Response from a [GenerateContentRequest](./ai.generatecontentrequest.md#generatecontentrequest_interface) |
|  [status](./ai.customerrordata.md#customerrordatastatus) | number | HTTP status code of the error response. |
|  [statusText](./ai.customerrordata.md#customerrordatastatustext) | string | HTTP status text of the error response. |

## CustomErrorData.errorDetails

Optional additional details about the error.

<b>Signature:</b>

```typescript
errorDetails?: ErrorDetails[];
```

## CustomErrorData.response

Response from a [GenerateContentRequest](./ai.generatecontentrequest.md#generatecontentrequest_interface)

<b>Signature:</b>

```typescript
response?: GenerateContentResponse;
```

## CustomErrorData.status

HTTP status code of the error response.

<b>Signature:</b>

```typescript
status?: number;
```

## CustomErrorData.statusText

HTTP status text of the error response.

<b>Signature:</b>

```typescript
statusText?: string;
```
