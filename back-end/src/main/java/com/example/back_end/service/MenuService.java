package com.example.back_end.service;

import com.example.back_end.dao.MenuDao;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class MenuService {
  private final MenuDao menuDao;

  public MenuService(MenuDao menuDao) {
    this.menuDao = menuDao;
  }

  public boolean insertMenu(String name, String img, List<Map<String, Object>> products) {
    try {
      return menuDao.insertMenu(name, img, products);
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }

  public List<Map<String, Object>> getMenu() {
    try {
      return menuDao.getMenu();
    } catch (Exception e) {
      e.printStackTrace();
      return null;
    }
  }
}
