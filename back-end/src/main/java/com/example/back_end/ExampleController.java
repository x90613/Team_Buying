package com.example.back_end;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class ExampleController {

    @RequestMapping("/test")
    public String test(){
        System.out.println("test");
        return "Hello World";
    }
}
