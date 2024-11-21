package com.example.back_end.service;

import com.example.back_end.dao.ManageDao;
import org.springframework.stereotype.Service;

@Service
public class ManageService {

    private final ManageDao manageDao;

    public ManageService(ManageDao manageDao) {
        this.manageDao = manageDao;
    }

    public boolean updateTransferStatus(Integer orderId, Integer paymentStatus) {
        return manageDao.updateTransferStatus(orderId, paymentStatus);
    }

    // Not be used in current setting
    public boolean updateOrderStatus(Integer orderId, Integer status) {
        return manageDao.updateOrderStatus(orderId, status);
    }

    public boolean finishTeamBuying(Integer hostFormId) {
        return  manageDao.finishTeamBuying(hostFormId);
    }
}
